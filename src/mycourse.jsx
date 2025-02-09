import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode for decoding the JWT
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SeeMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true when the fetch starts
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User is not authenticated. Please log in.");
          setLoading(false); // Turn off loading
          return;
        }

        // Decode the token to get the instructor ID
        const decodedToken = jwtDecode(token);
        const instructorId = decodedToken.id;

        // Fetch courses using the instructor's ID in the URL parameter
        const response = await axios.get(
          `http://localhost:8000/api/mycourses/${instructorId}`, // Use the URL parameter for instructorId
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data.courses);
        setMessage("Courses loaded successfully!"); // Success message
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch courses.");
      } finally {
        setLoading(false); // Turn off loading
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Courses</h2>

      {/* Display success or error message */}
      {message && <p className="alert alert-success">{message}</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      {/* Loading spinner */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Display courses if available */}
      {courses.length === 0 ? (
        <p className="text-center">No courses found.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>
                    <strong>Price:</strong> ${course.price}
                  </p>
                  <p>
                    <strong>Duration:</strong> {course.duration} hours
                  </p>
                  <p>
                    <strong>Technology:</strong> {course.technology}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeMyCourses;
