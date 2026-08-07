import React, { useState, useEffect } from 'react'
import "./UserPages/newJobUser.css"
import { useNavigate } from 'react-router-dom';
import "./jobPostedAdmin.css";
import { useTheme } from "./context/ThemeContext";

function JobPostedAdmin() {
  const { mode } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [changeJob, setChangeJob] = useState(null);
  const [formData, setFormData] = useState({
    id: "", title: "",
    company: "", salary: "", skills: "", qualification: "", yearsOfExp: "", jobDesc: ""
  });
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
    fetch("https://hiretrack-v2.onrender.com/UserPages/newJobUser",
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
        fetch("https://hiretrack-v2.onrender.com/availJobs", {
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


  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`https://hiretrack-v2.onrender.com/editJob/${formData.id}`, {
      method: "PATCH",
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
      .then(data => {

        setJobs(prev =>
          prev.map(job =>
            job._id === data._id ? data : job
          )
        );
        setSelectedJob(prev =>
          prev && prev._id === data._id ? data : prev
        );
        setChangeJob(null);

        console.log("Job edited successfully");
      })
      .catch(err => console.log(err));
  }

  function manageDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`https://hiretrack-v2.onrender.com/manageDel/${id}`, {
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
    <div className={`jobsPage ${mode}`}>

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
                      <div className="actionBtns">
                        <button
                          className="viewBtn"
                          onClick={() => setSelectedJob(job)}
                        >
                          👁
                        </button>

                        <button
                          className="editBtn"
                          onClick={() => {
                            setChangeJob(job);
                            setFormData({
                              id: job._id,
                              title: job.title,
                              company: job.company,
                              salary: job.salary,
                              qualification: job.qualification,
                              skills: job.skills,
                              yearsOfExp: job.yearsOfExp,
                              jobDesc: job.jobDesc
                            });
                          }}
                        >
                          ✏️
                        </button>

                        <button
                          className="deleteBtn"
                          onClick={() => manageDelete(job._id)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>

                  </tr>

                )

              })
            }

          </tbody>

        </table>

      </div>
      {selectedJob && (
        <div className="overlay">

          <div className="modal">

            <div className="modalHeader">
              <h2>{selectedJob.title}</h2>
              <button
                className="closeBtn"
                onClick={() => setSelectedJob(null)}
              >
                ✖
              </button>
            </div>

            <div className="modalBody">

              <div className="detail">
                <span>Company</span>
                <p>{selectedJob.company}</p>
              </div>

              <div className="detail">
                <span>Salary</span>
                <p>₹ {selectedJob.salary}</p>
              </div>

              <div className="detail">
                <span>Qualification</span>
                <p>{selectedJob.qualification}</p>
              </div>

              <div className="detail">
                <span>Skills</span>
                <p>{selectedJob.skills}</p>
              </div>

              <div className="detail">
                <span>Experience</span>
                <p>{selectedJob.yearsOfExp} Years</p>
              </div>

              <div className="detail">
                <span>Posted</span>
                <p>{getTimeAgo(selectedJob.postedAt)}</p>
              </div>

              <div className="description">
                <span> Job Description</span>
                <p>{selectedJob.jobDesc}</p>
              </div>

            </div>

          </div>

        </div>
      )}

      {changeJob && (
        <div className="overlay">

          <div className="modal">

            <div className="modalHeader">
              <h2>{formData.title}</h2>
              <button
                className="closeBtn"
                onClick={() => setChangeJob(null)}
              >
                ✖
              </button>
            </div>


            <form onSubmit={handleSubmit}>

              <label>Job Title</label>
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

              <label>Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />

              <label>Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />

              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />

              <label>Years of Experience</label>
              <input
                type="text"
                name="yearsOfExp"
                value={formData.yearsOfExp}
                onChange={handleChange}
              />

              <label>Job Description</label>
              <textarea
                name="jobDesc"
                value={formData.jobDesc}
                onChange={handleChange}
              />

              <button type="submit">
                Update Job
              </button>

            </form>
          </div>

        </div>
      )}
    </div>
  );

}

export default JobPostedAdmin