import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./applicantsAdmin.css";
function ApplicantsAdmin() {
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
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

function handleChange(id, e) {

    const newStatus = e.target.value;

    fetch("http://localhost:5000/changeDetail", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            _id: id,
            status: newStatus
        })
    })
    .then(res => res.json())
    .then(data => {

        setInfo(prev =>
            prev.map(app =>
                app._id === id
                    ? { ...app, status: newStatus }
                    : app
            )
        );

    })
    .catch(err => console.log(err));
}
return (
    <div className="applicantsPage">

        <h1 className="pageTitle">Applicants</h1>

        <p className="pageSubtitle">
            Review all applicants and update their application status.
        </p>

        <div className="tableContainer">

            <table className="applicantTable">

                <thead>

                    <tr>
                        <th>Applicant</th>
                        <th>Job</th>
                        <th>Salary</th>
                        <th>Qualification</th>
                        <th>Experience</th>
                        <th>Resume</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        info.map(inf => {

                            return (

                                <tr key={inf._id}>

                                    <td>{inf.user_id?.email}</td>

                                    <td>{inf.job_id?.title}</td>

                                    <td>₹ {inf.job_id?.salary}</td>

                                    <td>{inf.job_id?.qualification}</td>

                                    <td>{inf.job_id?.yearsOfExp} Years</td>

                                    <td>

                                        <a
                                            href={`http://localhost:5000/${inf.resume}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="resumeBtn"
                                        >
                                            Resume
                                        </a>

                                    </td>

                                    <td>

                                        <select
                                            value={inf.status}
                                            onChange={(e) => handleChange(inf._id, e)}
                                            className="statusSelect"
                                        >

                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Shortlisted">
                                                Shortlisted
                                            </option>

                                            <option value="Reviewing">
                                                Reviewing
                                            </option>

                                            <option value="Selected">
                                                Selected
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            )

                        })
                    }

                </tbody>

            </table>

        </div>

    </div>
)}

export default ApplicantsAdmin;