import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";

const SearchCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [courses, setCourses] = useState([]); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    if (!searchTerm) {
      setError("Please enter a course name to search.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/searchcourses?name=${searchTerm}`
      );
      setCourses(response.data.courses); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to search courses.");
    } finally {
      setLoading(false); 
    }
  };

  // Function to handle View Course button click
  const handleViewCourse = (courseId) => {
    navigate(`/viewcourse/${courseId}`); // Use navigate to go to the course details page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Search Courses</h2>

      {error && <p className="alert alert-danger text-center">{error}</p>}

      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="search">Course Name</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            required
            className="form-control"
            placeholder="Enter course name"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ width: "100%" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="row">
        {courses.length === 0 ? (
          <p className="text-center text-muted">No courses found.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="col-md-4 mb-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>
                    <strong className="text-secondary">course id:</strong> {course._id}
                  </p>
                  <p>
                    <strong className="text-secondary">Duration:</strong> {course.duration} hours
                  </p>
                  <p>
                    <strong className="text-secondary">Technology:</strong> {course.technology}
                  </p>
                  <p>
                    <strong className="text-secondary">Price:</strong> ${course.price}
                  </p>
                  <button
                    className="btn btn-outline-primary btn-block"
                    onClick={() => handleViewCourse(course._id)} // Call handleViewCourse on click
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchCoursesPage;
