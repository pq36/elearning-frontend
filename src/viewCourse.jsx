import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "bootstrap/dist/css/bootstrap.min.css";

const ViewCoursePage = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null); // Store course details
  const [instructor, setInstructor] = useState(null); // Store instructor details
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Handle error state
  const [enrolled, setEnrolled] = useState(false); // Track enrollment status
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Fetch course data based on courseId
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/course/${courseId}`);
        setCourse(response.data.course); // Set course data to state

        // Fetch instructor details using instructorId from the course
        const instructorResponse = await axios.get(`http://localhost:8000/api/getOneInstructorById/${response.data.course.instructor}`);
        setInstructor(instructorResponse.data); // Set instructor data to state
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch course details.");
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Enroll the student in the course
  const enrollCourse = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage

      if (!token) {
        return alert("You need to log in first.");
      }

      const response = await axios.post(
        `http://localhost:8000/api/student/enroll`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEnrolled(true); // Mark as enrolled
        // Optionally, navigate to another page after successful enrollment
        // navigate("/your-redirect-path"); // Uncomment to redirect
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to enroll in the course.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Course Details</h2>

      {course ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">{course.description}</p>
            <p>
              <strong className="text-secondary">Duration:</strong> {course.duration} hours
            </p>
            <p>
              <strong className="text-secondary">Technology:</strong> {course.technology}
            </p>
            <p>
              <strong className="text-secondary">Price:</strong> ${course.price}
            </p>

            <h5 className="mt-4">Instructor Information</h5>
            {instructor ? (
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{instructor.name}</h6>
                  <p className="card-text"><strong>Email:</strong> {instructor.email}</p>
                  <p className="card-text"><strong>Technologies:</strong> {instructor.technology} </p>
                  <p className="card-text"><strong>Specialization:</strong> {instructor.specialization}</p>
                  <p className="card-text"><strong>Location:</strong> {instructor.location}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted">Instructor details not available.</p>
            )}

            {enrolled ? (
              <button className="btn btn-success" disabled>Enrolled</button>
            ) : (
              <button className="btn btn-primary" onClick={enrollCourse}>Enroll Now</button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Course not found.</p>
      )}
    </div>
  );
};

export default ViewCoursePage;
