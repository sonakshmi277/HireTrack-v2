import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Admin() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({ company: "", email: "", password: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.company !== "" && formData.email !== "" && formData.password !== "") {
            console.log("Form submitted");
        }
        else {
            alert("Please fill all details");
            return;
        }

        fetch("http://localhost:5000/adminData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    console.log("Login successful")
                    localStorage.setItem("token", data.token);
                    console.log("token saved", data.token)
                    return navigate("/adminHomePage");

                }
                else {
                    console.log("Invalid admin")
                }
            })
            .catch(err => console.log(err));

        

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="company" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
                <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Admin;