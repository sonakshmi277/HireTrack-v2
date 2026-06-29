import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function NewJobUser() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
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


    return (
        <div>New jobs appear here
            {
                jobs.map(job => {
                    return (
                        <div key={job._id}>
                            <h1>{job._id}</h1>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default NewJobUser