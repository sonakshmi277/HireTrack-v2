import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./jobUser.css";

function JobUser() {

    const [info, setInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/applidetail", {
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
                setInfo(data);
                console.log(data);
            })
            .catch(err => console.log(err));

    }, []);

   return (

    <div className="jobsPage">

        <div className="pageHeader">

            <h1>My Applications</h1>

            <p>
                Track the progress of all your job applications.
            </p>

        </div>

        <div className="tableContainer">

            <table className="jobsTable">

                <thead>

                    <tr>

                        <th>Job Title</th>

                        <th>Company</th>

                        <th>Salary</th>

                        <th>Status</th>

                        <th>Resume</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        info.map((inf) => (

                            <tr key={inf._id}>

                                <td>

                                    <strong>

                                        {inf.job_id?.title}

                                    </strong>

                                </td>

                                <td>

                                    {inf.job_id?.company}

                                </td>

                                <td>

                                    ₹ {inf.job_id?.salary}

                                </td>

                                <td>

                                    <span className={`status ${inf.status.toLowerCase()}`}>

                                        {inf.status}

                                    </span>

                                </td>

                                <td>

                                    <a

                                        href={`http://localhost:5000/${inf.resume}`}

                                        target="_blank"

                                        rel="noopener noreferrer"

                                        className="resumeBtn"

                                    >

                                        View Resume

                                    </a>

                                </td>

                                <td>

                                    <button

                                        className="viewBtn"

                                    >

                                        👁

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    </div>

);
}

export default JobUser;