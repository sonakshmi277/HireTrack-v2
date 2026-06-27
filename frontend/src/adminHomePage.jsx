import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./adminHomePage.css";

function AdminHomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/adminHomePage",
      {
        method: "GET",
        headers: { authorization: token }
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
      .catch((err) => console.log(err));
  }, []);

  function handleDashClick(){
    navigate("/adminHomePage");
  }
  function handleJobClick(){
    navigate("/jobsAdmin")
  }
  function handleApplicantsClick(){
    navigate("/applicantsAdmin")
  }
  function handleLogOutClick(){
    navigate("/")
  }
  return (
    <div className="container">
      <div className="sidebar">

        <div className="box">
          <span className="icon">🏠</span>
          <span className="text" onClick={handleDashClick}>Dashboard</span>
        </div>

        <div className="box">
          <span className="icon">💼</span>
          <span className="text" onClick={handleJobClick}>Jobs</span>
        </div>

        <div className="box">
          <span className="icon">👥</span>
          <span className="text" onClick={handleApplicantsClick}>Applicants</span>
        </div>

        <div className="box">
          <span className="icon">⇦</span>
          <span className="text" onClick={handleLogOutClick}>Logout</span>
        </div>

      </div>

      <div className="content">
        Welcome to HireTrack
      </div>
    </div>
  )
}

export default AdminHomePage