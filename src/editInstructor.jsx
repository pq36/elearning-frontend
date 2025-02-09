import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const EditInstructor = () => {
  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    location: "",
    specialization: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams(); // Get instructor ID from URL params
  const navigate = useNavigate();

  // Fetch instructor data on component mount
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const instructorId = id || decodedToken.id;

        const response = await axios.get(`http://localhost:8000/api/getOneInstructorById/${instructorId}`);
        setFormData({
          name: response.data.name,
          technology: response.data.technology,
          location: response.data.location,
          specialization: response.data.specialization,
          password: "",
        });
      } catch (err) {
        console.error("Failed to fetch instructor data:", err);
        setError("Failed to load instructor data. Please try again.");
      }
    };

    fetchInstructorData();
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/updateInstructor/${id}`, formData);
      setSuccess(response.data.msg);
      setError("");
    } catch (err) {
      console.error("Failed to update instructor:", err);
      setError(err.response?.data?.msg || "Failed to update instructor. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Edit Instructor</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="technology" className="form-label">Technology</label>
          <input
            type="text"
            className="form-control"
            id="technology"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialization" className="form-label">Specialization</label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditInstructor;
