const express = require("express")
const router = express.Router()
const galleryController= require("../controllers/galleryController")
const roomsController=require("../controllers/roomsController")
const teamController=require("../controllers/teamController")
const menuController=require("../controllers/menuController")
const restaurantController=require("../controllers/restaureantController")
const bookingController=require("../controllers/bookingController")
const reserveController=require("../controllers/reserveController")
const commentontroller=require("../controllers/commentController")


router.get("/gallery", galleryController.getAllImages)
router.post("/gallery", galleryController.postImages)
router.get("/gallery/:id", galleryController.getImageById)
router.delete("/gallery/:id", galleryController.deleteImageById)
router.patch("/gallery/:id", galleryController.patchgImageId)
router.put("/gallery/:id", galleryController.putImageyById)


router.get("/rooms", roomsController.getAllRooms)
router.post("/rooms", roomsController.postRooms)
router.get("/rooms/:id", roomsController.getRoomById)
router.delete("/rooms/:id", roomsController.deleteRoomById)
router.patch("/rooms/:id", roomsController.patchRoomId)
router.put("/rooms/:id", roomsController.putRoomById)

router.get("/team", teamController.getAllTeam)
router.post("/team", teamController.postMember)
router.get("/team/:id", teamController.getMemberById)
router.delete("/team/:id", teamController.deleteMemberById)
router.patch("/team/:id", teamController.patchMemberId)
router.put("/team/:id", teamController.putMemberById)

router.get("/menu", menuController.getAllMenu)
router.post("/menu", menuController.postMeals)
router.get("/menu/:id", menuController.getMealById)
router.delete("/menu/:id", menuController.deleteMealById)
router.patch("/menu/:id", menuController.patchgMealId)
router.put("/menu/:id", menuController.putMealById)

router.get("/restaurant", restaurantController.getAllImages)
router.post("/restaurant", restaurantController.postImages)
router.get("/restaurant/:id", restaurantController.getImageById)
router.delete("/restaurant/:id", restaurantController.deleteImageById)
router.patch("/restaurant/:id", restaurantController.patchgImageId)
router.put("/restaurant/:id", restaurantController.putImageyById)

router.get("/booking", bookingController.getAllBookings)
router.post("/booking", bookingController.postBooking)
router.get("/booking/:id", bookingController.getBookingById)
router.delete("/booking/:id", bookingController.deleteBookingById)
router.patch("/booking/:id", bookingController.patchgBookingById)
router.put("/booking/:id", bookingController.putBookingById)


router.get("/reservation", reserveController.getAllReservations)
router.post("/reservation", reserveController.postReservation)
router.get("/reservation/:id", reserveController.getReserveById)
router.delete("/reservation/:id", reserveController.deleteReservationById)
router.patch("/reservation/:id", reserveController.patchReserveById)
router.put("/reservation/:id", reserveController.putReserveById)


router.get("/comment", commentontroller.getAllComments)
router.post("/comment", commentontroller.postComment)
router.get("/comment/:id", commentontroller.getCommentById)
router.delete("/comment/:id", commentontroller.deleteCommentById)
router.patch("/comment/:id", commentontroller.patchgCommentId)
router.put("/comment/:id", commentontroller.putCommentById)


module.exports = router