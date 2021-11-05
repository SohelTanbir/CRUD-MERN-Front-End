import React from 'react';

const Home = () => {
    const style = {
            position: "absolute",
            left:" 50%",
            top:' 40%',
            transform: 'translate(-50%, -50%)',
            fontSize: "40px",
            fontWeight:700,
            color: "#1d1dbf",
            textTransform: "uppercase",
    }
    return (
        <h2 style={style}>CRUD Application with MERN </h2>
    );
};

export default Home;