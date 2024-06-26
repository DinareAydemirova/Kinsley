import React, { useContext, useEffect, useState } from "react";
import style from "../allRooms/AllRooms.module.scss";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userProvider";

const AllRooms = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(8);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/rooms").then((res) => {
      setData(res.data);
    });
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };


  

  const filteredData = data.filter((room) => {
    if (filter === "economy") {
      return room.price < 30;
    }
    if (filter === "luxe") {
      return room.price > 60;
    }
    if (filter === "standard") {
      return room.price >= 30 && room.price <= 60;
    }
    return true;
  });

  const handleRoomClick = (roomId) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/Rooms/${roomId}`);
    }
  };

  return (
    <div className={style.allRooms}>
      <div className={style.container}>
        <div className={style.sorting}>
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? style.active : ""}
          >
            All rooms
          </button>
          <button
            onClick={() => setFilter("economy")}
            className={filter === "economy" ? style.active : ""}
          >
            Economy
          </button>
          <button
            onClick={() => setFilter("luxe")}
            className={filter === "luxe" ? style.active : ""}
          >
            Luxe
          </button>
          <button
            onClick={() => setFilter("standard")}
            className={filter === "standard" ? style.active : ""}
          >
            Standard
          </button>
        </div>
        <div className={style.rooms}>
          {filteredData.slice(0, visible).map((elem) => (
            <div
              key={elem._id}
              className={style.room}
              onClick={() => handleRoomClick(elem._id)}
            >
              <img src={elem.images[0]} alt={elem.name} />
              <h2>{elem.name}</h2>
              <p>{elem.description.slice(0, 90)}...</p>
              <div className={style.booking}>
                <div className={style.pricing}>
                  <h1>${elem.price}</h1>
                  <p>per night</p>
                </div>
                <Link to={`/Rooms/${elem._id}`}>
                  <CiBookmark /> Book
                </Link>
              </div>
            </div>
          ))}
        </div>
        {visible < filteredData.length && (
          <div className={style.load}>
            <button className={style.loadMore} onClick={showMoreItems}>
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRooms;
