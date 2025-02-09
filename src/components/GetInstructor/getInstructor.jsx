import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/api/getAllInstructors");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8000/api/deleteInstructorById/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <div className='userTable container p-5 m-5'>
        <Link to={"/add"} className='addButton btn btn-primary'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User name</th>
                    <th>Phone Number</th>
                    <th>technologies</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.technology}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={/edit/+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default User