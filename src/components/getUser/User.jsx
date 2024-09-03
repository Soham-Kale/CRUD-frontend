import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./user.css"

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const response = await axios.get("https://mern-backend-o8uw.onrender.com/api/getAll");
            setUsers(response.data);
        }
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        await axios.delete(`https://mern-backend-o8uw.onrender.com/api/delete/${userId}`)
        .then((response) => {
            setUsers((prevUser) => prevUser.filter((users) => users._id !== userId));
            toast.success(response.data.msg, {position: "top-right"});
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='userTable'>
            <Link to={"/add"} className='addBtn'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => {
                        return(
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.email}</td>
                                <td className='actionBtn'>
                                    <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                    <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default User;
