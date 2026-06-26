import React, { useState } from 'react'

function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return alert("Please fill all details")
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
                    localStorage.setItem("token",data.token);
                    console.log("token saved", data.token)
                }
                else {
                    console.log("Invalid user")
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
                <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default SignIn