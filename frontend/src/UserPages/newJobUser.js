import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./newJobUser.css"

function NewJobUser() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [appl, setAppli] = useState([]);
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

        fetch("http://localhost:5000/UserPages/newJobUser", {

            method: "GET",

            headers: {
                authorization: token
            }

        })

            .then(res => {

                if (res.status === 401 || res.status === 403) {

                    navigate("/");

                    return;

                }

                return res.json();

            })

            .then(data => {

                console.log(data);

                fetch("http://localhost:5000/availJobs", {

                    method: "GET",

                    headers: {

                        "Content-Type": "application/json",

                        authorization: token

                    }

                })

                    .then(res => res.json())

                    .then(data => {

                        setJobs(data.jobs);

                        setAppli(data.appli);

                    })

                    .catch(err => console.log(err));

            })

            .catch(err => console.log(err));

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

    }

    return (

    <div className="jobsPage">

        <div className="pageHeader">

            <h1>Available Jobs</h1>

            <p>
                Explore opportunities that match your skills and apply instantly.
            </p>

        </div>

        <div className="tableContainer">

            <table className="jobsTable">

                <thead>

                    <tr>

                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Salary</th>
                        <th>Experience</th>
                        <th>Posted</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        jobs.map(job => {

                            const apl = appl.find(
                                application => application.job_id === job._id
                            );

                            return (

                                <tr key={job._id}>

                                    <td>
                                        <strong>{job.title}</strong>
                                    </td>

                                    <td>
                                        {job.company}
                                    </td>

                                    <td>
                                        ₹ {job.salary}
                                    </td>

                                    <td>
                                        {job.yearsOfExp} yrs
                                    </td>

                                    <td>
                                        {getTimeAgo(job.postedAt)}
                                    </td>

                                    <td>

                                        {

                                            apl ?

                                                <span className={`status ${apl.status.toLowerCase()}`}>

                                                    {apl.status}

                                                </span>

                                                :

                                                <span className="status notApplied">

                                                    Not Applied

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        <button
                                            className="viewBtn"
                                        >

                                            👁

                                        </button>

                                    </td>

                                </tr>

                            )

                        })

                    }

                </tbody>

            </table>

        </div>

    </div>

)
}

export default NewJobUser;