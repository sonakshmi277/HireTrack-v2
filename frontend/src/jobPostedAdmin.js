import React, { useState, useEffect } from 'react'
import "./UserPages/newJobUser.css"
import { useNavigate } from 'react-router-dom';
import "./jobPostedAdmin.css";
function JobPostedAdmin() {
  const [jobs, setJobs] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const navigate = useNavigate();
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
            "Content-Type": "application/json", authorization: token
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setJobs(data.jobs);

          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err))


  }, []);

  function manageDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/manageDel/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div className="jobsPage">

      <div className="pageHeader">

        <h1>Manage Jobs</h1>

        <p>
          View and manage all active job postings.
        </p>

      </div>

      <div className="tableContainer">

        <table className="jobTable">

          <thead>

            <tr>

              <th>Job Title</th>

              <th>Company</th>

              <th>Salary</th>

              <th>Experience</th>

              <th>Posted</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              jobs.map(job => {

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
                      <span className="postedBadge">
                        {getTimeAgo(job.postedAt)}
                      </span>
                    </td>

                    <td>

                      <button
                        className="viewBtn" onClick={() => setSelectedApplicant(job)}
                      >
                        👁
                      </button>
                      <button className="editBtn">
                        ✏️
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => manageDelete(job._id)}
                      >
                        🗑
                      </button>

                    </td>

                  </tr>

                )

              })
            }

          </tbody>

        </table>

      </div>
      {selectedApplicant && (
        <div className="overlay">

          <div className="modal">

            <div className="modalHeader">
              <h2>{selectedApplicant.title}</h2>
              <button
                className="closeBtn"
                onClick={() => setSelectedApplicant(null)}
              >
                ✖
              </button>
            </div>

            <div className="modalBody">

              <div className="detail">
                <span>Company</span>
                <p>{selectedApplicant.company}</p>
              </div>

              <div className="detail">
                <span>Salary</span>
                <p>₹ {selectedApplicant.salary}</p>
              </div>

              <div className="detail">
                <span>Qualification</span>
                <p>{selectedApplicant.qualification}</p>
              </div>

              <div className="detail">
                <span>Skills</span>
                <p>{selectedApplicant.skills}</p>
              </div>

              <div className="detail">
                <span>Experience</span>
                <p>{selectedApplicant.yearsOfExp} Years</p>
              </div>

              <div className="detail">
                <span>Posted</span>
                <p>{getTimeAgo(selectedApplicant.postedAt)}</p>
              </div>

              <div className="description">
                <span> Job Description</span>
                <p>{selectedApplicant.jobDesc}</p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );

}

export default JobPostedAdmin