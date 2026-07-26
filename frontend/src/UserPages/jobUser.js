import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./jobUser.css";

function JobUser() {

    const [info, setInfo] = useState([]);
    const[selectedAppli,setSelectedAppli]=useState(null);
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

                                        className="viewBtn" onClick={()=>setSelectedAppli(inf)}

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
        {selectedAppli && (
    <div className="overlay">

        <div className="modal">

            <div className="modalHeader">
                <h2>{selectedAppli.job_id.title}</h2>

                <button
                    className="closeBtn"
                    onClick={() => setSelectedAppli(null)}
                >
                    ✖
                </button>
            </div>

            <div className="modalBody">

                <div className="detail">
                    <span>Company</span>
                    <p>{selectedAppli.job_id.company}</p>
                </div>

                <div className="detail">
                    <span>Salary</span>
                    <p>₹ {selectedAppli.job_id.salary}</p>
                </div>

                <div className="detail">
                    <span>Qualification</span>
                    <p>{selectedAppli.job_id.qualification}</p>
                </div>

                <div className="detail">
                    <span>Skills</span>
                    <p>{selectedAppli.job_id.skills}</p>
                </div>

                <div className="detail">
                    <span>Experience</span>
                    <p>{selectedAppli.job_id.yearsOfExp} Years</p>
                </div>

                <div className="description">
                    <span>Job Description</span>
                    <p>{selectedAppli.job_id.jobDesc}</p>
                </div>

            </div>

        </div>

    </div>
)}

    </div>

);
}

export default JobUser;