import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import "./UserHomePage.css";

function UserHomePage() {

    const navigate = useNavigate();
    const [recentJobs, setRecentJobs] = useState([]);
    const [counts, setCounts] = useState({
        pending: 0,
        interview: 0,
        selected: 0,
        rejected: 0,
        appliCt: 0,
        reviewing: 0
    });
    function getTimeAgo(postedAt) {
        const now = new Date();
        const posted = new Date(postedAt);

        const diff = now - posted;

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) {
            return `${minutes} min ago`;
        }
        if (hours < 24) {
            return `${hours} hr ago`;
        }

        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    const [selectedJob, setSelectedJob] = useState(null);
    const { mode, toggleTheme } = useTheme();
    function handleJobClick() {
        navigate("/UserPages/jobUser");
    }

    function handleNewJobClick() {
        navigate("/UserPages/newJobUser");
    }

    function handleLogOutClick() {
        localStorage.removeItem("token");
        navigate("/");
    }
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/recentJobs", {
            method: "GET",
            headers: { authorization: token }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate("/admin");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setRecentJobs(data);
                }
            })
            .catch(err => console.log(err));

        fetch("http://localhost:5000/applicationCounts", {
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => setCounts(data))
            .catch(err => console.log(err));
    }, []);
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
                        <div className="bg" onClick={toggleTheme}>
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
                        <h2>{counts.appliCt}</h2>
                        <p>Applications</p>
                    </div>

                    <div className="statCard">
                        <h2>{counts.pending}</h2>
                        <p>Pending</p>
                    </div>

                    <div className="statCard">
                        <h2>{counts.reviewing}</h2>
                        <p>Reviewing</p>
                    </div>

                    <div className="statCard">
                        <h2>{counts.selected}</h2>
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

                {recentJobs.map(job => (
                    <div className="jobCard" key={job._id}>

                        <div className="jobLeft">
                            <h3><strong>Job Title:</strong> {job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                        </div>
                        <div className="jobRight">

                            <p className="posted">
                                Posted {getTimeAgo(job.postedAt)}
                            </p>

                            <h3 className="salary">
                                ₹ {job.salary}
                            </h3>

                            <div className="jobBtns">
                                <button onClick={() => setSelectedJob(job)}>
                                    View
                                </button>
                            </div>

                        </div>

                    </div>
                ))}


            </div>
            {selectedJob && (
                <div className="overlay">

                    <div className="modal">

                        <div className="modalHeader">
                            <h2>{selectedJob.title}</h2>
                            <button
                                className="closeBtn"
                                onClick={() => setSelectedJob(null)}
                            >
                                ✖
                            </button>
                        </div>

                        <div className="modalBody">

                            <div className="detail">
                                <span>Company</span>
                                <p>{selectedJob.company}</p>
                            </div>

                            <div className="detail">
                                <span>Salary</span>
                                <p>₹ {selectedJob.salary}</p>
                            </div>

                            <div className="detail">
                                <span>Qualification</span>
                                <p>{selectedJob.qualification}</p>
                            </div>

                            <div className="detail">
                                <span>Skills</span>
                                <p>{selectedJob.skills}</p>
                            </div>

                            <div className="detail">
                                <span>Experience</span>
                                <p>{selectedJob.yearsOfExp} Years</p>
                            </div>

                            <div className="detail">
                                <span>Posted</span>
                                <p>{getTimeAgo(selectedJob.postedAt)}</p>
                            </div>

                            <div className="description">
                                <span> Job Description</span>
                                <p>{selectedJob.jobDesc}</p>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>

    );

}

export default UserHomePage;