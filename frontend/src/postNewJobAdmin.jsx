import React, { useState } from 'react'
import "./postNewJobAdmin.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

function PostNewJobAdmin() {

    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        salary: "",
        qualification: "",
        skills: "",
        yearsOfExp: "",
        jobDesc: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.company ||
            !formData.salary ||
            !formData.qualification ||
            !formData.skills ||
            !formData.yearsOfExp ||
            !formData.jobDesc
        ) {
            alert("Please fill all details to post a job");
            return;
        }

        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/postNewJob", {
            method: "POST",
            headers: {
                authorization: token,
                "Content-Type": "application/json"
            },
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
            .then(data => {

                if (data) {

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
            .catch(err => console.log(err));

    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleHireTrackClick() {
        navigate("/adminHomePage");
    }
return (
    <div className={`app ${mode}`}>
                
        <div className="pageContainer">

            <div className="pageHeader">

                <h2>Create Job Posting</h2>

                <p>
                    Fill in the details below to publish a new opportunity.
                </p>

            </div>

            <form
                className="jobForm"
                onSubmit={handleSubmit}
            >

                <div className="row">

                    <div className="field">

                        <label>Job Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Frontend Developer"
                        />

                    </div>

                    <div className="field">

                        <label>Company</label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                        />

                    </div>

                </div>

                <div className="row">

                    <div className="field">

                        <label>Salary (₹)</label>

                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="600000"
                        />

                    </div>

                    <div className="field">

                        <label>Experience Required</label>

                        <input
                            type="number"
                            name="yearsOfExp"
                            value={formData.yearsOfExp}
                            onChange={handleChange}
                            placeholder="2"
                        />

                    </div>
                                 
                </div>

                <div className="field fullField">

                    <label>Minimum Qualifications</label>

                    <textarea
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="Bachelor's degree in Computer Science or equivalent..."
                    />

                </div>

                <div className="field fullField">

                    <label>Required Skills</label>

                    <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB, Express..."
                    />

                </div>


                <div className="field fullField">

                    <label>Job Description</label>

                    <textarea
                        className="largeTextarea"
                        name="jobDesc"
                        value={formData.jobDesc}
                        onChange={handleChange}
                        placeholder="Describe the responsibilities, role expectations, benefits and other important details..."
                    />

                </div>


                <div className="buttonSection">

                    <button
                        type="button"
                        className="cancelBtn"
                        onClick={handleHireTrackClick}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="publishBtn"
                    >
                        Publish Job
                    </button>

                </div>

            </form>

        </div>
    </div>
  );

}

export default PostNewJobAdmin;