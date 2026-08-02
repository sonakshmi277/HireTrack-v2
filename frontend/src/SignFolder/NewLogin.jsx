import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newLogin.css";

function NewLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please fill all details");
            return;
        }

        fetch("http://localhost:5000/newLogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.token) {

                    localStorage.setItem("token", data.token);

                    navigate("/UserPages/UserHomePage");

                } else {

                    alert("Invalid email or password");

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

        <div className="loginPage">

            <div className="loginCard">

                <h1>Welcome</h1>

                <p>Create an account</p>

                <form onSubmit={handleSubmit}>

                    <div className="inputGroup">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="inputGroup">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default NewLogin;