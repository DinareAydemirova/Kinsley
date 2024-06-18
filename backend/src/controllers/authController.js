const userModel = require("../models/userModel")

const bcrypt= require('bcrypt')
const jwt= require("jsonwebtoken")

const loginController=async(req, res)=>{
 try {
    const {email , password}=req.body;
    const user=await userModel.findOne({email:email});
    if(!user){
        res.status(404).send({message: "User is not found!"})
        return
    }
    const checkPassword=await bcrypt.compare(password , user.password);
    if(!checkPassword){
        res.status(403).send({message: "Password is not correct!"});
        return;
    }
    const token= jwt.sign(
        {
            userId:user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role:user.role,
        },
        process.env.JWT_KEY,
        {
            expiresIn:"1h"
        }
    )
    res.status(200).send(token)
 } catch (error) {
    res.status(500).send({message:error.message})
 }
}

 const registerController = async (req, res) =>{
    try {
        const {email, password, firstName, lastName} =req.body;
        const existingUser =await userModel.findOne({email: email})
        if(existingUser){
            res.status(409).send({message: "User Already Exist"})
            return
        }
        const hash= await bcrypt.hash(password, 12);
        const newUser=new userModel({
            email,
            password:hash,
            firstName,
            lastName,
        });
        await newUser.save()
        const token = jwt.sign({email:newUser.email}, process.env.JWT_KEY,{
            expiresIn:"1h",
        });
        res.status(200).json(token)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

 const resetPsswordController=async(req, res)=>{
    try {
        const {email, password}=req.body
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({message:"User is not found"})
        }
        const hashedPassword=await bcrypt.hash(password, 12)

        user.password=hashedPassword;
        await user.save()

        res.status(200).send({message:"Password reset successfully"})
    } catch (error) {
        console.error("Error resetting password:" , error)
        res.status(500).send({message:"Failed to reset password"})
    }
}

module.exports={resetPsswordController, registerController, loginController}