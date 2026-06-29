import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../adminHomePage.css";
function UserHomePage() {
    const navigate=useNavigate();
    function handleDashClick(){
    navigate("/UserPages/UserHomePage");
  }
  function handleJobClick(){
    navigate("/UserPages/jobUser")
  }
  function handleNewJobClick(){
    navigate("/UserPages/newJobUser")
  }
  function handleLogOutClick(){
    localStorage.removeItem("token");
    navigate("/")}
    return (
        <div className="container">
            <div className="sidebar">

                <div className="box">
                    <span className="icon">🏠</span>
                    <span className="text" onClick={handleDashClick}>Dashboard</span>
                </div>

                <div className="box">
                    <span className="icon">💼</span>
                    <span className="text" onClick={handleJobClick}>Jobs applied on</span>
                </div>

                <div className="box">
                    <span className="icon">👥</span>
                    <span className="text" onClick={handleNewJobClick}>New jobs</span>
                </div>

                <div className="box">
                    <span className="icon">⇦</span>
                    <span className="text" onClick={handleLogOutClick}>Logout</span>
                </div>

            </div>
        </div>
            )
}

export default UserHomePage