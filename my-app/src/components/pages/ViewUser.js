import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

const ViewUser = () => {
  const { idUser } = useParams();

  useEffect(() => {
    const loadDataUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/Users/${idUser}`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    loadDataUser();
  }, [idUser]);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  return (
    <div className="container">
      <h2 className="py-4">View User</h2>
      <NavLink
        className="btn btn-info text-white"
        to="/"
        style={{ borderRadius: "20px" }}
      >
        Home
      </NavLink>
      <br /> <br />
      <ul className="list-group w-50 shadow">
        <li className="list-group-item">id: {user.id}</li>
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">phone: {user.phone}</li>
      </ul>{" "}
      <br />
    </div>
  );
};

export default ViewUser;
