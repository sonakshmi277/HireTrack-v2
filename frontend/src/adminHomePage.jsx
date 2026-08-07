import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./adminHomePage.css";
import { useTheme } from "./context/ThemeContext";
function AdminHomePage() {

  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const [value, setValue] = useState({ totalJobs: 0 });
  const [counts, setCounts] = useState({
    pending: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
    appliCt:0,
    reviewing:0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [changeJob, setChangeJob] = useState(null);
  const [formData, setFormData] = useState({
    id: "", title: "",
    company: "", salary: "", skills: "", qualification: "", yearsOfExp: "", jobDesc: ""
  });
  const [recentAppli, setrecentAppli] = useState([]);
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

    fetch("https://hiretrack-v2.onrender.com/adminHomePage",
      {
        method: "GET",
        headers: {
          authorization: token
        }
      }
    )
      .then(res => {

        if (res.status === 401 || res.status === 403) {
          navigate("/admin");
          return;
        }

        return res.json();

      })
      .then(data => {

        if (data) {
          console.log(data);
        }

      })
      .catch(err => console.log(err));

    fetch("https://hiretrack-v2.onrender.com/applicationCounts", {
      headers: {
        authorization: token
      }
    })
      .then(res => res.json())
      .then(data => setCounts(data))
      .catch(err => console.log(err));

    fetch("https://hiretrack-v2.onrender.com/jobCount", {
      method: "GET",
      headers: { authorization: token }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          navigate("/admin");
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log("Job count found");
          setValue(data);
        }
      })
      .catch(err => console.log(err));

    fetch("https://hiretrack-v2.onrender.com/recentJobs", {
      method: "GET",
      headers: { authorization: token }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          navigate("/admin");
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setRecentJobs(data);
        }
      })
      .catch(err => console.log(err));

    fetch("https://hiretrack-v2.onrender.com/applidetail", {
      method: "GET",
      headers: { authorization: token }
    })
      .then(res => {
        return res.json();

      })
      .then(data => {
        if (data) {
          setrecentAppli(data);
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  function handleJobClick() {
    navigate("/jobsAdmin");
  }
  function handleManageJobClick() {
    navigate("/jobPostedAdmin");
  }
  function handleApplicantsClick() {
    navigate("/applicantsAdmin");
  }
  function handleLogOutClick() {
    localStorage.removeItem("token");
    navigate("/");
  }
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

        setRecentJobs(prev =>
          prev.map(job =>
            job._id === data._id ? data : job
          )
        );
        setChangeJob(null);

        console.log("Job edited successfully");
      })
      .catch(err => console.log(err));
  }

  return (

    <div className={`app ${mode}`}>

      <div className="topBar">
        <div style={{ cursor: "pointer" }}>

          <h1>HireTrack</h1>

        </div>

        <div className="topRight">

          <div className="logout" onClick={handleLogOutClick}>
            ⏻
          </div>
          <div className="bg" onClick={toggleTheme}>
            ☀️
          </div>

        </div>
      </div>

      <div className="welcome">

        <h2>Welcome back Admin</h2>

        <p>
          Here's what's happening today.
        </p>

      </div>

      <div className="stats">

        <div className="statCard">
          <h3>{value.totalJobs}</h3>
          <p>Jobs Posted</p>
        </div>

        <div className="statCard">
          <h3>{counts.interview}</h3>
          <p>Called for Interview</p>
        </div>

        <div className="statCard">
          <h3>{counts.pending}</h3>
          <p>Pending Review</p>
        </div>

        <div className="statCard">
          <h3>{counts.selected}</h3>
          <p>Selected</p>
        </div>
        

      </div>

      <h2 className="section">
        Quick Actions
      </h2>

      <div className="actions">

        <button onClick={handleJobClick}>Post Job</button>

        <button onClick={handleManageJobClick}>Manage Jobs</button>

        <button onClick={handleApplicantsClick}> Applicants</button>

      </div>

      <h2 className="sectionTitle">
        Recently Posted Jobs
      </h2>

      {
        recentJobs.map(job => (
          <div className="jobCard" key={job._id}>

            <div>
              <h3>{job.title}</h3>
              <p>Posted {getTimeAgo(job.postedAt)}</p>
            </div>

            <div>
              <div className="links">
                <button className="editBtn" onClick={() => {
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
                  })
                }}>Edit</button>

              </div>
            </div>

          </div>
        ))
      }

      <h2 className="sectionTitle">
        Latest Applicants
      </h2>

      {recentAppli.map((applicant) => (
        <div className="applicantCard" key={applicant._id}>

          <div>
            <h3>{applicant.user_id?.email}</h3>

            <p>
              Applied for {applicant.job_id?.title}
            </p>
          </div>

          <div>

            <span className={`status ${applicant.status.toLowerCase()}`} style={{ marginBottom: "20px" }}>
              {applicant.status}
            </span>

            <a
              href={`https://hiretrack-v2.onrender.com/${applicant.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="resumeBtn" style={{ borderRadius: "45px" }}
            >
              Resume
            </a>

          </div>

        </div>
      ))}
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

export default AdminHomePage;