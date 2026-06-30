import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./newJobUser.css"
function NewJobUser() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [file, setFile] = useState(null);
    function getTimeAgo(postedAt) {
        const now = new Date();
        const posted = new Date(postedAt);

        const diff = now - posted;

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) {
            return `${minutes} min ago`;
        }
        if (hours < 24) {
            return `${hours} hr ago`;
        }

        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/UserPages/newJobUser",
            {
                method: "GET",
                headers: {
                    authorization: token
                }
            }
        )
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate("/");
                    return;
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                fetch("http://localhost:5000/availJobs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setJobs(data);

                    })
                    .catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err))


    }, []);
    const handleUpload = async (file, jobId) => {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_id", jobId);

        await fetch("http://localhost:5000/uploadResume", {
            method: "POST",
            headers: {
                authorization: localStorage.getItem("token")
            },
            body: formData
        });
    };

    return (
        <div>New jobs appear here
            {
                jobs.map(job => {
                    return (
                        <div className="cont" key={job._id} style={{ backgroundColor: "pink" }}>
                            <h2>Title : {job.title}</h2>
                            <h2>Company: {job.company}</h2>
                            <h2>Salary: {job.salary}</h2>
                            <h2>Qualifications needed: {job.qualification}</h2>
                            <h2>Skills needed: {job.skills}</h2>
                            <h2>Years of experience: {job.yearsOfExp}</h2>
                            <h2>Job description: {job.jobDesc}</h2>
                            <p>Job Posted at: {getTimeAgo(job.postedAt)}</p>
                            <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <button onClick={() => handleUpload(file, job._id)}>Apply</button>

                        </div>
                    )
                })
            }

        </div>
    )
}

export default NewJobUser