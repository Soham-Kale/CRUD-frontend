import React, { useEffect, useState } from 'react'
import "../addUser/add.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        fname: "",
        lname: "",
        email: ""
    }

    const [user, setUser] = useState(users);
    const {id} = useParams();
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value});
        console.log(user);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getOne/${id}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => console.log(error));
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
            toast.success(response.data.msg, {position: "top-right"});
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Update User</h3>

            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup' >
                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={user.fname} onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='Enter first name'/>
                </div>
                <div className='inputGroup' >
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" value={user.lname} onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Enter last name'/>
                </div>
                <div className='inputGroup' >
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Enter email'/>
                </div>
                <div className='inputGroup' >
                    <button type='submit'>UPDATE USER</button>
                </div>
            </form>
        </div>
    )
}

export default Edit