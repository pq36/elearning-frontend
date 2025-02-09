import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all users on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAllInstructors");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);
    if (!searchQuery) {
        // Fetch all users again if search input is cleared
        const response = await axios.get("http://localhost:8000/api/getAllInstructors");
        setUsers(response.data);
        return;
      }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/searchAllInstructorByNameFilter/${searchQuery}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
    }
  };

  return (
    <div className="userTable container p-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          name="name"
          className="form-control w-50"
          placeholder="Search Instructor"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/addInstructor" className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i>Add User
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Technologies</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.technology}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchUser;
