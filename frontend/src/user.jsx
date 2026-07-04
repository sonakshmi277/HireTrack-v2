import React from 'react'
import { useNavigate } from "react-router-dom"
import "./user.css";

function User() {

    const navigate = useNavigate();

    function handleSignIn() {
        navigate("/signIn");
    }

    function handleNewLogIn() {
        navigate("/newLogin");
    }

    return (

        <div className="userPage">

            <div className="userBox">

                <div className="logo">
                    👤
                </div>

                <h1>User Portal</h1>

                <p>
                    Sign in to continue or create a new account to start
                    applying for jobs on HireTrack.
                </p>

                <button onClick={handleSignIn}>
                    Sign In
                </button>

                <button
                    className="secondaryBtn"
                    onClick={handleNewLogIn}
                >
                    Create New Account
                </button>

            </div>

        </div>

    );

}

export default User;