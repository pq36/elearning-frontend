import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './instructor';

const ProfilePage = () => {
  return (
    <div className="container py-5">
      <Profile/>
      
      <div className="list-group">
        <Link to="/editInstructor" className="list-group-item list-group-item-action">
          Edit Profile
        </Link>
        <Link to="/createcourse" className="list-group-item list-group-item-action">
          Create Course
        </Link>
        <Link to="/mycourse" className="list-group-item list-group-item-action">
          See My Courses
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
