import React, { useState } from 'react'

function NewLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email !== "" && formData.password !== "") {
            console.log("Form submitted");
        }
        else {
            alert("Please fill all details")
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
                if (data === "Yes") {
                    console.log("Data saved successfully")
                }
                else {
                    console.log("There's a problem, data not saved")
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

export default NewLogin