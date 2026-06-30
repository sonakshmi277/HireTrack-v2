import React, { useState } from 'react'
import "./postNewJobAdmin.css";
import JobPostedAdmin from "./jobPostedAdmin";
import { useNavigate } from "react-router-dom";
function PostNewJobAdmin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", company: "", salary: "", qualification: "", skills: "", yearsOfExp: "", jobDesc: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.company || !formData.salary || !formData.qualification || !formData.skills || !formData.yearsOfExp
            ||
            !formData.jobDesc) {
            alert("Please fill all details to post a job")
            return;
        }
        const token = localStorage.getItem("token");
        console.log(token);
        fetch("http://localhost:5000/postNewJob", {
            method: "POST",
            headers: { authorization: token, "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate("/");
                    return;
                }
                if (res.status === 500) {
                    alert("Something went wrong on the server. Please try again later.");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    alert("Job posting successful");
                    setFormData({
                        title: "",
                        company: "",
                        salary: "",
                        qualification: "",
                        skills: "",
                        yearsOfExp: "",
                        jobDesc: ""
                    });
                    
                }
            })
            .catch((err) => console.log(err));
    }
    const handleChange = ((e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    });
    return (
        <div className='main'>
            <form onSubmit={handleSubmit}>

                <label style={{ marginTop: "30px" }}>Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                />

                <label>Salary (Rs.)</label>
                <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                />

                <label>Qualifications Needed</label>
                <textarea
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                />

                <label>Skills Needed</label>
                <textarea
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                />

                <label>Years of Experience</label>
                <input
                    type="number"
                    name="yearsOfExp"
                    value={formData.yearsOfExp}
                    onChange={handleChange}
                />

                <label>Job Description</label>
                <textarea
                    type="text"
                    name="jobDesc"
                    value={formData.jobDesc}
                    onChange={handleChange}
                />

                <button type="submit">Post Job</button>

            </form>
        </div>
    )
}

export default PostNewJobAdmin