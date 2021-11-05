import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers,faUserPlus  } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
const Header = () => {
    return (
        <div className="header">
          <nav>
              <ul>
                  <li><Link to="/home"><FontAwesomeIcon icon={faHome}/>Home</Link></li>
                  <li><Link to="/alluser"><FontAwesomeIcon icon={faUsers}/>AllUsers</Link></li>
                  <li><Link to="/adduser"><FontAwesomeIcon icon={faUserPlus}/>AddUser</Link></li>
              </ul>
          </nav>
          <div className="login">
              <Link to="/">SignIn/SignUp</Link>
          </div>
        </div>
    );
};

export default Header;