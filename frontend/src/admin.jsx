import React, { useState } from 'react'

function Admin() {
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

        fetch("http://localhost:5000/adminData")
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.company === formData.company && data.email === formData.email && data.password === formData.password) {
                    console.log("Correct admin");
                }
                else {
                    console.log("Hey spam person")
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
                <input type="text" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Admin;