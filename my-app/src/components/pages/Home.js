import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Joi from "joi";

const Home = () => {
  const navigate = useNavigate();
  const { idUser } = useParams();

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { name, email, phone } = user;

  useEffect(() => {
    if (!idUser) {
      loadUsers();
    } else {
      const loadDataUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3002/Users/${idUser}`
          );
          const foundUser = response.data;
          setUsers([foundUser]);
        } catch (error) {
          console.log("Error:", error);
        }
      };
      loadDataUser();
    }
  }, [idUser]);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitData = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      phone: Joi.string().required(),
    });

    const { error } = schema.validate(user);
    if (error) {
      // Handle validation error
      console.log("Validation Error:", error.details);
      alert("Please fill in all the required fields correctly.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/Users", user);
      navigate("/");
      loadUsers();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = async (userId, userName) => {
    const confirmed = window.confirm(
      "Are you sure to delete " + userName + "?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3002/Users/${userId}`);
        // Reload the user data after deletion
        loadUsers();
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/Users"
      );
      const fetchedUsers = response.data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center">Add Users</h2>
          <form className="shadow p-3" onSubmit={onSubmitData}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={onInputChange}
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Phone"
              name="phone"
              value={phone}
              onChange={onInputChange}
            />
            <input
              type="submit"
              className="btn btn-warning mb-2"
              value="Add User"
            />
          </form>
          <br />
        </div>
        <div className="col-md-8">
          <h2 className="text-center">View Users</h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered w-100">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>

                      <td
                        style={{
                          whiteSpace: "nowrap",
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <NavLink
                          className="btn btn-primary "
                          to={`/view/${user.id}`}
                        >
                          View
                        </NavLink>

                        <NavLink
                          className="btn btn-success "
                          to={`/edit/${user.id}`}
                        >
                          Edit
                        </NavLink>
                        <input
                          type="button"
                          value="Delete"
                          className="btn btn-danger"
                          onClick={() => handleDelete(user.id, user.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
