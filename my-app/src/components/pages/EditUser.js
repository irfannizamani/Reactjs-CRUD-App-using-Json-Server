import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { idUser } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/Users/${idUser}`
        );
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    loadUserData();
  }, [idUser]);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitData = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3002/Users/${idUser}`, user);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Edit User</h2>
      <NavLink
        className="btn btn-info text-white"
        to="/"
        style={{ borderRadius: "20px" }}
      >
        Home
      </NavLink>
      <br /> <br />
      <form onSubmit={onSubmitData}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={onInputChange}
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={onInputChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={onInputChange}
        />

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
      <br />
    </div>
  );
};

export default EditUser;
