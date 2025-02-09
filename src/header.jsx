import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/update-instructor'); // Navigate to the Update Instructor page
    } else {
      navigate('/login'); // Navigate to the login page
    }
  };

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between">
        <h1>Learnify</h1>
        {isLoggedIn && (
          <button className="btn btn-light" onClick={handleProfileClick}>
            Profile
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
