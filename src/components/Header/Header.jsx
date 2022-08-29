import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import { userContext } from '../../App';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const userName = loggedInUser?.email.split("@")[0];


    return (
        <div className="header">
            <nav>
                <ul>
                    <li><Link to="/home"><FontAwesomeIcon icon={faHome} />Home</Link></li>
                    <li><Link to="/alluser"><FontAwesomeIcon icon={faUsers} />AllUsers</Link></li>
                    <li><Link to="/adduser"><FontAwesomeIcon icon={faUserPlus} />AddUser</Link></li>
                </ul>
            </nav>
            <div className="login">
                {loggedInUser?.email ?
                    <Link to="/home">
                        <FontAwesomeIcon icon={faUser} />   {loggedInUser.email? userName:"User"}</Link>
                    :
                    <Link to="/login">Login</Link>
                }

            </div>
        </div>
    );
};

export default Header;