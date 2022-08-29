import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import '../AddUser/AddUser.css';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';


const UpdateUser = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {id} = useParams();
    const [user, setUser] = useState()
    const [updateUser, setUpdateUser] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        role: ''
    })

    //handle onBluer input filed
    const handleChange = (e) => {
        const newUser = { ...updateUser, [e.target.name]: e.target.value };
        setUpdateUser(newUser)
    }
// handle toast msg
const notify = (msg) => toast(msg, {autoClose: 1000,});

    // find single user from database 
    const url = `https://crud-application-using-mern.herokuapp.com/user/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => {
            console.log('errors is = '+ err)
        })


    // handle submit user
    const handleSubmit = (e) => {
        // fetch api from sever
        const url = `https://crud-application-using-mern.herokuapp.com/update/${id}`;
        fetch(url, {
            method: 'put',
            headers: {
             'content-type': 'application/json',
            'authorization': loggedInUser?.email 
        },
            body: JSON.stringify(updateUser)
        })
            .then(response => {
                if (response.ok) {
                    notify('User Updated Successfully')
                }  else if(response.status === 500){
                    notify('Authentication required!');
                }
                else {
                    notify('Something wrong!')
                }
            })
        e.preventDefault();
    }
    return (
        <div className="add-user">
            <h3><FontAwesomeIcon icon={faUserPlus} />Update user</h3>
            <div className="form_container">
                <form onSubmit={handleSubmit} method="post">
                    <input type="text" onChange={handleChange} name="name" defaultValue={user?.name} required /><br />

                    <input type="email" onChange={handleChange} name="email" defaultValue={user?.email}  required /><br />

                    <input type="number " onChange={handleChange} name="phone" defaultValue={user?.phone} required /><br />

                    <input type="text " onChange={handleChange} name="city" defaultValue={user?.city}  required /><br />
                    <select required name="role" onChange={handleChange} >
                        <option selected>{user?.role} </option>
                        <option value="admin">Admin</option>
                        <option value="administrator">Administrator</option>
                        <option value="user">User</option>
                        <option value="developer">Developer</option>
                    </select><br />
                    <ToastContainer/>
                    <button>Update Now</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;