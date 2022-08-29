import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddUser.css';
import { useHistory } from 'react-router';


const AddUser = () => {
    const [error, setError ] = useState("")
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password:'',
        phone: '',
        city: '',
        role: ''
    });
    const [selectedValue, setSelectedValue] = useState("user")

// handle toast msg
const notify = (msg) => toast(msg, {autoClose: 1000,});


    //handle onBluer input filed
    const handleChange = (e) => {
        const newUser = { ...user, [e.target.name]: e.target.value };
        setUser(newUser)
    }
// handle default value change
const handleDefualtValue = (e)=>{
    setSelectedValue(e.target.value);
}



    // handle submit user
    const handleSubmit = (e) => {
    
        if(user.name !=="" && user.email !=="" && user.password !==" " && user.city!=="" && user.phone!==""){
            console.log(user);
        // fetch api from sever
        const url = 'https://crud-application-using-mern.herokuapp.com/addUser';
        fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body:JSON.stringify(user)
        })
            .then(result => {
                if (result.ok){
                    setError('user added Successfully!');
                    // redirect to all users page after 1
                    setTimeout(()=>{
                        history.push('/alluser')
                    }, 1000)
                }
            })
        }else{
            setError("All field required!")
        }
        e.preventDefault();
    }
    return (
        <div className="add-user">
            <h3><FontAwesomeIcon icon={faUserPlus} /> Add New User </h3>
            <div className="form_container">
                <form onSubmit={handleSubmit} method="post">
                    <input type="text" onBlur={handleChange} name="name" placeholder="Enter Your Name"  /><br />

                    <input type="email" onBlur={handleChange} name="email" placeholder="Enter Your Email"  /><br />

                    <input type="password" onBlur={handleChange} name="password" placeholder="Enter Your Password"  /><br />

                    <input type="number " onBlur={handleChange} name="phone" placeholder="Enter Your Phone"  /><br />

                    <input type="text " onBlur={handleChange} name="city" placeholder="Enter Your City Name" /><br />
                    <select required name="role" onBlur={handleChange} onChange={handleDefualtValue} value={selectedValue}>
                        <option value="admin">Admin</option>
                        <option value="administrator">Administrator</option>
                        <option value="user">User</option>
                        <option value="developer">Developer</option>
                    </select><br />
                    <ToastContainer />
                    <button onClick={()=> notify(error)}>Add now</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;