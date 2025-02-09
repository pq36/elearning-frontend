import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Install using: npm install jwt-decode
import axios from "axios";

const Profile = () => {
  const [instructor, setInstructor] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to fetch instructor data
  const fetchInstructorData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getOneInstructorById/${id}`);
      setInstructor(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch instructor data");
    }
  };

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
      return;
    }

    try {
      // Decode the JWT to get the user ID
      const { id } = jwtDecode(token);
      fetchInstructorData(id);
    } catch (err) {
      console.error("Invalid token:", err.message);
      navigate("/login"); // Redirect to login if token is invalid
    }
  }, [navigate]);

  if (error) {
    return <div className="container"><p className="text-danger">{error}</p></div>;
  }

  if (!instructor) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container py-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{instructor.name}</h5>
          <p className="card-text">id: {instructor._id}</p>
          <p className="card-text">Email: {instructor.email}</p>
          <p className="card-text">Technology: {instructor.technology}</p>
          <p className="card-text">specialization: {instructor.specialization}</p>
          <p className="card-text">location: {instructor.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
