import React from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate=useNavigate();
    function handleClick(){
        navigate("/admin")
    }
    function handleuserClick(){
        navigate("/user")
    }
  return (
    <div>
        <h1>Welcome to HireTrack</h1>
        <h2>Who are you?</h2>
        <button onClick={handleClick}>Admin</button>
        <button onClick={handleuserClick}>User</button>
    </div>
  )
}

export default Home;