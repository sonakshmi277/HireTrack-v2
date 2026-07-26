import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../adminHomePage.css";
import "./UserHomePage.css";

function UserHomePage() {

    const navigate = useNavigate();
    const [mode,setMode]=useState("dark");
    function handleJobClick() {
        navigate("/UserPages/jobUser");
    }

    function handleNewJobClick() {
        navigate("/UserPages/newJobUser");
    }

    function handleMode(){
        setMode(prev=>(prev==="dark"?"light":"dark"))
    }
    function handleLogOutClick() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (

        <div className={`app ${mode}`} >

           

            <div className="dashboard">

                <div className="topBar">

                    <div>

                        <h1>HireTrack</h1>

                    </div>

                    <div className="topRight">
                        <div className="logout" onClick={handleLogOutClick}>
                            ⏻
                        </div>
                        <div className="bg" onClick={handleMode}>
                            ☀️
                        </div>

                    </div>

                </div>

                <div className="welcome">

                    <h2>Welcome User</h2>

                    <p>
                        Find your dream job and keep track of every application.
                    </p>

                </div>

                <div className="stats">

                    <div className="statCard">
                        <h2>6</h2>
                        <p>Applications</p>
                    </div>

                    <div className="statCard">
                        <h2>3</h2>
                        <p>Pending</p>
                    </div>

                    <div className="statCard">
                        <h2>2</h2>
                        <p>Reviewing</p>
                    </div>

                    <div className="statCard">
                        <h2>1</h2>
                        <p>Selected</p>
                    </div>

                </div>

                <h2 className="sectionTitle">
                    Quick Actions
                </h2>

                <div className="actions">

                    <button onClick={handleNewJobClick}>
                        Browse Jobs
                    </button>

                    <button onClick={handleJobClick}>
                         My Applications
                    </button>

                </div>

                <h2 className="sectionTitle">
                    New Jobs
                </h2>

                <div className="jobCard">

                    <div>

                        <h3>Frontend Developer</h3>

                        <p>Cognizant</p>

                        <span className="skills">
                            React • Node • MongoDB
                        </span>

                    </div>

                    <div className="jobRight">

                        <p>Posted 2 hrs ago</p>

                        <h3>₹6 LPA</h3>

                        <span className="pending">
                            Pending
                        </span>

                        <div className="jobBtns">

                            <button>
                                View
                            </button>

                            <button>
                                Apply
                            </button>

                        </div>

                    </div>

                </div>

                <div className="jobCard">

                    <div>

                        <h3>Backend Developer</h3>

                        <p>IBM</p>

                        <span className="skills">
                            Java • Spring Boot • SQL
                        </span>

                    </div>

                    <div className="jobRight">

                        <p>Posted Yesterday</p>

                        <h3>₹8 LPA</h3>

                        <span className="notApplied">
                            Not Applied
                        </span>

                        <div className="jobBtns">

                            <button>
                                View
                            </button>

                            <button>
                                Apply
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UserHomePage;