import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./home.css";

function Home() {
    const navigate = useNavigate();
    function handleAdminClick() {
        navigate("/admin")
    }
    function handleUserClick() {
        navigate("/user")
    }
    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome to HireTrack</h1>
                <p>
                    Your smart career companion to discover jobs,
                    track applications and build your professional journey.
                </p>
                <h2>Who are you?</h2>
                <div className="buttons">
                    <button
                        className="admin"
                        onClick={handleAdminClick}
                    >
                        Continue as Admin
                    </button>
                    <button
                        className="user"
                        onClick={handleUserClick}
                    >
                        Continue as User
                    </button>
            </div>
        </div>

        </div>
    )
}

export default Home;