import React, { useEffect, useState } from 'react';
import GenericCard from '../components/genericCard';
import SystemPasswordModal from '../services/login.service';

const HomePage = () => {
    const [showModal, setShowModal] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
        setShowModal(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
            setShowModal(false);
            }
      }, []);
    

    return (
        <div style={{ padding: "15vh" }}>
            <div>
                {!loggedIn &&
                    <SystemPasswordModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onLogin={handleLogin}
                    />
                }
            </div>

            <GenericCard
                style={{
                    fontSize: "30vh",
                    border: "2px solid #005cbf",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10vh",
                }}
                title={<h1 style={{ fontSize: "10vh", color: "#005cbf" }}>Corona management system for HMO</h1>}
            />
        </div>
    );
};

export default HomePage;
