import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <h1 className="m-0">Learnify</h1>
      <div>
        {isLoggedIn ? (
          <>
          <img
  src="https://tse3.mm.bing.net/th?id=OIP.F977i9e7dMrznvOT8q8azgHaEf&pid=Api&P=0&h=220"
  alt="Profile"
  className="rounded-circle me-3"
  style={{ cursor: "pointer", width: "50px", height: "50px" }} // Adjust the size as needed
  onClick={handleProfile}
/>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};



const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="bg-primary text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">Welcome to Learnify</h1>
        <p className="lead">Your gateway to quality online education</p>
        <button className="btn btn-light btn-lg mt-3" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">Expert Instructors</h5>
              <p className="card-text">Learn from industry experts with years of experience.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">Flexible Learning</h5>
              <p className="card-text">Access courses anytime, anywhere on any device.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4">
              <h5 className="card-title">Certifications</h5>
              <p className="card-text">Earn recognized certificates to advance your career.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  const courses = [
    { id: 1, name: "Web Development", description: "Learn HTML, CSS, and JavaScript." },
    { id: 2, name: "Data Science", description: "Master Python and data visualization." },
    { id: 3, name: "AI and Machine Learning", description: "Dive into neural networks and AI." },
  ];

  return (
    <div className="py-5">
      <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
  <h2>Popular Courses</h2>
  <a href="/searchcourse" className="btn btn-link">See More</a>
</div>

        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  <button className="btn btn-primary">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Learnify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <PopularCourses />
      <Footer />
    </div>
  );
};

export default Home;
