import React from 'react';
import { useState, useEffect } from 'react';
import './AllUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const [users, setUsers] = useState([])
    
        useEffect(()=>{
            fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => {
            console.log('date fetch error iss :'+err)
        })
        }, [])
// delete user from database
const deleteUser = (id) =>{
   const url = `http://localhost:5000/delete/${id}`;
   fetch(url, {
       method:'delete',
       headers:{'content-type':'application/json'},
   })
   .then(result =>{
       if(result.ok){
           alert('User deleted Successfully!')
       }else{
        alert('User is not deleted!!')
       }
   })
}



console.log(users)
    return (
        <div className="all-user">
            <h3><FontAwesomeIcon icon={faUsers} /> All Users information ({users?.length|| 0})</h3>
            <table border="1">
                <tr>
                    <th>Serial</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
             {
                 users.map((user, index) =>(
                    <tr>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{'0'+user.phone}</td>
                    <td>{user.city}</td>
                    <td><span><Link to="updateUser"><FontAwesomeIcon className="editBtn" icon={faUserEdit} /> </Link> || <FontAwesomeIcon className="deleteBtn" onClick={()=> deleteUser(user._id)} icon={faTrash} /> </span></td>
                </tr>
                 ))
             }

            </table>
        </div>
    );
};

export default AllUsers;