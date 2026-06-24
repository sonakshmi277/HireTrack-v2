import React from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate=useNavigate();
    function handleAdminClick(){
        navigate("/admin")
    }
    function handleUserClick(){
        navigate("/user")
    }
  return (
    <div>
        <h1>Welcome to HireTrack</h1>
        <h2>Who are you?</h2>
        <button onClick={handleAdminClick}>Admin</button>
        <button onClick={handleUserClick}>User</button>
    </div>
  )
}

export default Home;