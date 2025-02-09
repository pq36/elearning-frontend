import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    technology: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      const decodedToken = jwtDecode(token); // Decode the JWT
      const instructorId = decodedToken.id; // Extract instructor ID from the token (use `id` instead of `_id`)

      const response = await axios.post(
        `http://localhost:8000/api/createcourse`,
        { ...formData, instructor: instructorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setFormData({ title: "", description: "", price: "", duration: "", technology: "" }); // Reset form
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create the course. Try again."
      );
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Create Course</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="technology">Technology</label>
          <input
            type="text"
            id="technology"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="duration">Duration (in hours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
