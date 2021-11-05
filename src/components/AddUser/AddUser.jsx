import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './AddUser.css';


const AddUser = ({title}) => {

    const [user, setUser] = useState({
        name: 'SohelRana',
        email: '',
        phone: '',
        city: '',
        role: ''
    })

    //handle onBluer input filed
    const handleChange = (e) => {
        const newUser = { ...user, [e.target.name]: e.target.value };
        setUser(newUser)
    }
    // handle submit user
    const handleSubmit = (e) => {
        // fetch api from sever
        const url = 'http://localhost:5000/addUser';
        fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body:JSON.stringify(user)
        })
            .then(result => {
                if (result.ok){
                    alert('user added Successfully!')
                }else{
                    alert('Something wrong!')
                }
             
            })


        e.preventDefault();
    }

    return (
        <div className="add-user">
            <h3><FontAwesomeIcon icon={faUserPlus} /> {title} </h3>
            <div className="form_container">
                <form onSubmit={handleSubmit} method="post">
                    <input type="text" onBlur={handleChange} name="name" placeholder="Enter Your Name" required /><br />

                    <input type="email" onBlur={handleChange} name="email" placeholder="Enter Your Email" required /><br />

                    <input type="number " onBlur={handleChange} name="phone" placeholder="Enter Your Phone" required /><br />

                    <input type="text " onBlur={handleChange} name="city" placeholder="Enter Your City Name" required /><br />
                    <select required name="role" onBlur={handleChange} >
                        <option selected>Select user Role</option>
                        <option value="admin">Admin</option>
                        <option value="administrator">Administrator</option>
                        <option value="user">User</option>
                        <option value="developer">Developer</option>
                    </select><br />
                    <button>Add now</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;