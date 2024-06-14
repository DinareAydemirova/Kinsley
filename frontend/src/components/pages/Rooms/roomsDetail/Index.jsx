import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import style from "../roomsDetail/detail.module.scss";
import axios from "axios";


const RoomDetail = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    people: 0,
    images: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/rooms/${id}`);
      setData(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className={style.roomdetail}>
      <div className={style.container}>
        <div className={style.heading}>
          <h1>Deluxe Room</h1>
          <div className={style.home}>
            <Link to="/">Home</Link>
            <IoIosArrowForward />
            <Link to="/Rooms">Rooms</Link>
            <IoIosArrowForward />
            <p>{data.name}</p>
          </div>
        </div>
        <div className={style.booking}>
          <div className={style.roomimages}>
            <img
              src={data.images[0]}
              alt={data.name}
              className={style.mainimage}
            />
            <div className={style.chilimages}>
              {data.images.slice(1).map((img, index) => (
                <div>
                  <img key={index} src={img} alt={`Room image ${index + 1}`} />
                </div>
              ))}
            </div>
            <div>
              <h3>About Room</h3>
              <p>{data.description}</p>
            </div>
          </div>

          <div className={style.book}>
            <div className={style.info}>
              <p>People: {data.people}</p>
              <div>
                <h1>${data.price}</h1>
                <p>per night</p>
              </div>
            </div>
            <form action="" className={style.form}>
              <label htmlFor="">Check in</label>
              <input type="date" name="" id="" />
              <label htmlFor="">Check out</label>
              <input type="date" name="" id="" />
              <div className={style.peoplecount}>
                <label htmlFor="">people</label>
                <select name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <label htmlFor="">Card number</label>
              <input type="text" name="" id="" />
              <div className={style.cartinfo}>
                <div>
                  <label htmlFor="">valid through</label>
                  <input type="text" name="" id="" placeholder="month/year" />
                </div>
                <div>
                  <label htmlFor="">CVC code</label>
                  <input type="text" name="" id="" />
                </div>
              </div>
              <button>pay</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
