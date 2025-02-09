import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
  const initialUserState = {
    name: "",
    technology: "",
    phone_number: "",
    location: "",
    specialization: "",
  };

  const [user, setUser] = useState(initialUserState);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/createInstructor", user)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to register instructor", { position: "top-right" });
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Register Instructor</h3>
          <Link to="/" className="btn btn-secondary btn-sm">
            Back
          </Link>
        </div>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Full Name"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="technology" className="form-label">
              Technology
            </label>
            <input
              type="text"
              id="technology"
              name="technology"
              className="form-control"
              placeholder="Enter Technologies"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              placeholder="Enter Location"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="specialization" className="form-label">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="form-control"
              placeholder="Enter Specialization"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Already registered?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Add;
