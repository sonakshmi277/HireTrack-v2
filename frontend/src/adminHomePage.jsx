import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./adminHomePage.css";

function AdminHomePage() {

  const navigate = useNavigate();
  const [mode, setMode] = useState("dark");

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/adminHomePage",
      {
        method: "GET",
        headers: {
          authorization: token
        }
      }
    )
      .then(res => {

        if (res.status === 401 || res.status === 403) {
          navigate("/admin");
          return;
        }

        return res.json();

      })
      .then(data => {

        if (data) {
          console.log(data);
        }

      })
      .catch(err => console.log(err));

  }, []);

  function handleJobClick() {
    navigate("/jobsAdmin");
  }
  function handleManageJobClick() {
    navigate("/jobPostedAdmin");
  }

  function handleApplicantsClick() {
    navigate("/applicantsAdmin");
  }
  function handleMode() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"))
  }

  function handleLogOutClick() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (

    <div className={`app ${mode}`}>

      <div className="topBar">
        <div style={{ cursor: "pointer" }}>

          <h1>HireTrack</h1>

        </div>

        <div className="topRight">

          <div className="notification">
            🔔
          </div>

          <div className="profile">
            👤
          </div>
          <div className="logout" onClick={handleLogOutClick}>
            ⏻
          </div>
          <div className="bg" onClick={handleMode}>
            ☀️
          </div>

        </div>

      </div>

      <div className="welcome">

        <h2>Welcome back Admin</h2>

        <p>
          Here's what's happening today.
        </p>

      </div>

      <div className="stats">

        <div className="statCard">
          <h3>15</h3>
          <p>Jobs Posted</p>
        </div>

        <div className="statCard">
          <h3>64</h3>
          <p>Applications</p>
        </div>

        <div className="statCard">
          <h3>18</h3>
          <p>Pending Review</p>
        </div>

        <div className="statCard">
          <h3>12</h3>
          <p>Selected</p>
        </div>

      </div>

      <h2 className="section">
        Quick Actions
      </h2>

      <div className="actions">

        <button onClick={handleJobClick}>Post Job</button>

        <button onClick={handleManageJobClick}>Manage Jobs</button>

        <button onClick={handleApplicantsClick}> Applicants</button>

      </div>

      <h2 className="sectionTitle">
        Recently Posted Jobs
      </h2>

      <div className="jobCard">

        <div>

          <h3>Frontend Developer</h3>

          <p>Posted 2 days ago</p>

        </div>

        <div>

          <p>Applicants : 12</p>

          <div className="links">

            <span>Edit</span>

            <span>Delete</span>

          </div>

        </div>

      </div>

      <div className="jobCard">

        <div>

          <h3>Backend Developer</h3>

          <p>Posted Yesterday</p>

        </div>

        <div>

          <p>Applicants : 8</p>

          <div className="links">

            <span>Edit</span>

            <span>Delete</span>

          </div>

        </div>

      </div>

      <h2 className="sectionTitle">

        Latest Applicants

      </h2>

      <div className="applicantCard">

        <div>

          <h3> Sonakshmi Bhattacharya</h3>

          <p>Applied for Frontend Developer</p>

        </div>

        <div>

          <span className="status">
            Pending
          </span>

          <button className="resumeBtn">
            Resume
          </button>

        </div>

      </div>

      <div className="applicantCard">

        <div>

          <h3>Rahul Das</h3>

          <p>Applied for Backend Developer</p>

        </div>

        <div>

          <span className="status review">
            Reviewing
          </span>

          <button className="resumeBtn">
            Resume
          </button>

        </div>

      </div>

    </div>
  
    

  );

}

export default AdminHomePage;