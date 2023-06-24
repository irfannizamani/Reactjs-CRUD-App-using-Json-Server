import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="text-danger"> 404 NotFound Page</h1>
      <br />
      <NavLink to="/" className={"btn btn-info text-white"}>
        Go to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
