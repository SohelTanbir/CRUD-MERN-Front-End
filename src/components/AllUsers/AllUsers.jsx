import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './AllUser.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
const AllUsers = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [filterValue, setFilterValue] = useState([])
    const history = useHistory();
    const [users, setUsers] = useState([]);

// handle toast msg
const notify = (msg) => toast(msg, {autoClose: 1000,});



    useEffect(() => {
        fetch('https://crud-application-using-mern.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                const filterData = data.filter(user => user.role===filterValue)
              if(filterData.length){
                setUsers(filterData)
              }else{
                setUsers(data)
              }
          
            })
            .catch(err => {
                console.log(err)
            })
    }, [filterValue])
    // delete user from database
    const deleteUser = (id) => {
       if(window.confirm("Do want to Delete The User ?")){
            const url = `https://crud-application-using-mern.herokuapp.com/delete/${id}`;
            fetch(url, {
                method: 'delete',
                headers: {
                     'content-type': 'application/json',
                    'authorization': loggedInUser?.email
                     },
            })
                .then(response => {

                    if (response.ok) {
                        notify('Success!');
                        // relaod window after 1 sec
                       setTimeout(()=>{
                        window.location.reload();
                       }, 1000)
                    }
                    else if(response.status === 500){
                        notify('Authentication required!');
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
       }

    }
    // update user 
    const updateUser = (id) => {
        history.push(`updateUser/${id}`)
    }
// filter user by their role
const filterUser = (e)=>{
    setFilterValue(e.target.value)
}

    return (
        <div className="all-user">
            <div className="user-header">
                <h3><FontAwesomeIcon icon={faUsers} /> All Users information ({users?.length || 0})</h3>
                {/* filter data */}
                <select required name="role" onChange={filterUser}>
                  <option value="all users">All users</option>
                  <option value="admin">admin</option>
                  <option value="administrator">administrator</option>
                  <option value="user">user</option>
                  <option value="developer">developer</option>
              </select>
            </div>
            <table border="1">
                <tr>
                    <th>Serial</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                {
                    users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{'0' + user.phone}</td>
                            <td>{user.city}</td>
                            <td>{user.role}</td>
                            <td><span><FontAwesomeIcon onClick={() => updateUser(user._id)} className="editBtn" icon={faUserEdit} title="Edit" /> || <FontAwesomeIcon className="deleteBtn" onClick={() => deleteUser(user._id)} icon={faTrash}  title="Delete" /> </span></td>
                        </tr>
                    ))
                }
            </table>
            <ToastContainer/>
            {users.length?'': <h3 className="data-not-available">Please wait...</h3>}
        </div>
    );
};

export default AllUsers;