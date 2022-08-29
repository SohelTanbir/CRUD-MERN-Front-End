import React from 'react';
import './Home.css';
import mernImg  from '../../images/home.png'



const Home = () => {
  
    return (
        <div className='home'>
            <h2>Welcome to CRUD Application  <br />  using <span> Mern</span> Stack</h2>
            <img src={mernImg} alt="mern stack " />
        </div>
    );
};

export default Home;