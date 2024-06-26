import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ManageRooms = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(8); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/rooms").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/rooms/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((room) => room._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the room!", error);
      });
  };

  const filteredData = data.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <Helmet>
        <title>Admin Manage Rooms - kinsley</title>
        <link
          rel="shortcut icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUgFpfnDFc3lR56q1erL71EEv1lNvDYrbfQ&s"
          type="image/x-icon"
        />
      </Helmet>
      <div className="p-4 flex justify-between">
        <div className="flex gap-4">
          <h1 className="text-3xl">Rooms</h1>
          <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
            onClick={() => navigate("/admin/rooms/post")}
          >
            Add new room
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoMdSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Image</th>
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Price</th>
              <th className="text-left p-3 px-5">People</th>
              <th className="text-left p-3 px-5">Rate</th>
              <th className="text-left p-3 px-5">Detail</th>
              <th className="text-left p-3 px-5">Edit</th>
              <th className="text-left p-3 px-5">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((elem) => (
              <tr
                key={elem._id}
                className="border-b hover:bg-orange-100 bg-gray-100"
              >
                <td className="p-3 px-5">
                  <img src={elem.images[0]} alt={elem.name} className="w-24" />
                </td>
                <td className="p-3 px-5">{elem.name}</td>
                <td className="p-3 px-5">{elem.price}</td>
                <td className="p-3 px-5">{elem.people}</td>
                <td className="p-3 px-5">{elem.rate}</td>
                <td className="p-3 px-5">
                  <div className="flex justify-center">
                    <Link
                      to={`/admin/rooms/${elem._id}`}
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Detail
                    </Link>
                  </div>
                </td>
                <td className="p-3 px-5">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/rooms/edit/${elem._id}`)}
                      className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                  </div>
                </td>
                <td className="p-3 px-5">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(elem._id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-4 pb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ManageRooms;
