import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const navigate = useNavigate();

  // ✅ Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/course/${courseId}`);
        setCourse(response.data.course);

        const instructorResponse = await axios.get(`http://localhost:8000/api/getOneInstructorById/${response.data.course.instructor}`);
        setInstructor(instructorResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
      fetchEnrolledCourses(); // ✅ Fetch enrolled courses on component mount
    }
  }, [courseId]);

  // ✅ Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get("http://localhost:8000/api/getEnrolledCourses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Enrolled Courses (Frontend):", response.data.enrolledCourses);

      if (response.data.enrolledCourses) {
        setEnrolledCourses(new Set(response.data.enrolledCourses.map(course => course.toString())));
      }
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
    }
  };

  // ✅ Enroll the student in the course
  const enrollCourse = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You need to log in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/enroll",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEnrolledCourses(prev => new Set([...prev, courseId])); // ✅ Update enrolled courses
        alert("Successfully enrolled!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error enrolling in course.");
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
            <p><strong className="text-secondary">Duration:</strong> {course.duration} hours</p>
            <p><strong className="text-secondary">Technology:</strong> {course.technology}</p>
            <p><strong className="text-secondary">Price:</strong> ${course.price}</p>

            <h5 className="mt-4">Instructor Information</h5>
            {instructor ? (
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{instructor.name}</h6>
                  <p className="card-text"><strong>Email:</strong> {instructor.email}</p>
                  <p className="card-text"><strong>Technologies:</strong> {instructor.technology} </p>
                  <p className="card-text"><strong>Specialization:</strong> {instructor.specialization}</p>
                  <p className="card-text"><strong>Location:</strong> {instructor.location}</p>
                  <p className="card-text"><strong>Number of Views:</strong> {course.views-1}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted">Instructor details not available.</p>
            )}

            {/* ✅ Fixed enrollment button logic */}
            {enrolledCourses.has(course._id.toString()) ? (
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
