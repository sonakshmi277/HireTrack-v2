import React, { useState, useEffect } from 'react'
import "./UserPages/newJobUser.css"
import { useNavigate } from 'react-router-dom';
function JobPostedAdmin() {
  const [jobs, setJobs] = useState([]);
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
    .then(res=>res.json())
    .then(data=>{
      setJobs(data.jobs);
    })
    .catch((err)=>console.log(err.message));
  }
  return (
    <div>
      {
        jobs.map(job => {
          return (
            <div className="cont" key={job._id} style={{ backgroundColor: "pink" }}>
              <h2>{job.title}</h2>
              <h2> {job.company}</h2>
              <h2>{job.salary}</h2>
              <h2>{job.qualification}</h2>
              <h2> {job.skills}</h2>
              <h2> {job.yearsOfExp}</h2>
              <h2>{job.jobDesc}</h2>
              <p>{getTimeAgo(job.postedAt)}</p>
              <button onClick={()=>manageDelete(job._id)}>🗑️</button>

            </div>
          )
        })
      }
    </div>
  )
}

export default JobPostedAdmin