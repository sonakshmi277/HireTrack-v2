import React from 'react'
import {useNavigate} from "react-router-dom"

function User() {
    const navigate=useNavigate();
    function handleSignIn(){
        navigate("/signIn")
    }
    function handleNewLogIn(){
        navigate("/newLogin")
    }
    return(
        <div>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleNewLogIn}>New Log in</button>
        </div>
    )
}

export default User;