import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { userContext } from '../../App';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const history = useHistory();
    // login user data
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    // login context provider
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const handleChange = (e) => {
        const newUser = { ...user, [e.target.name]: e.target.value,  };
        setUser(newUser);
    }
// handle toast msg
const notify = (msg) => toast(msg, {autoClose: 1000,});



    const handleSubmit = (e) => {
        fetch('https://crud-application-using-mern.herokuapp.com/login', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
       .then(response =>{
        if(response.ok){
            setLoggedInUser(user);
            notify('Login Success');
            // redirect login page to home page
            setTimeout(() => {
                history.push('/home');
            }, 1000);
        }else if(response.status === 404){
            notify('User not Found!')
        }else{
            notify('Login Failed!')
        }
       }).catch(err=>{
        console.log("error = ", err.message);
       })
        e.preventDefault();
    }

    return (
        <div id="login">
            <h3>Login Now</h3>
            <div className="input-box">
                <form onSubmit={handleSubmit}>
                    <input type="email" onBlur={handleChange} name="email" placeholder="Enter your email" required /> <br />
                    <input type="password" onBlur={handleChange} name="password" placeholder="Enter your password" required /> <br />
                    <ToastContainer/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;