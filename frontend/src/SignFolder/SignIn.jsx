import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./signIn.css";

function SignIn() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {
            return alert("Please fill all details");
        }

        fetch("http://localhost:5000/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.token) {

                    console.log("Sign In successful");

                    localStorage.setItem("token", data.token);

                    console.log("token saved", data.token);

                    navigate("/UserPages/UserHomePage");

                }
                else {

                    console.log("Invalid user");

                }

            })
            .catch(err => console.log(err));

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    return (

        <div className="signPage">

            <div className="signBox">

                <div className="logo">
                    🔐
                </div>

                <h1>Welcome Back</h1>

                <p>
                    Sign in to access your HireTrack account.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    )

}

export default SignIn;