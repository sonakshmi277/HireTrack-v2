import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    fetch("http://localhost:5000/changeDetail", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
      ,
      body: JSON.stringify({
        _id: id,
        status: e.target.value
      })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log("Status updated in backend Db")
        console.log(data);
        setInfo(prev => prev.map(app =>
          app._id === id ? { ...app, status: e.target.value } : app
        ));


      })
      .catch(err => { console.log(err.message) });
  }


  return (
    <div>
      {
        info.map(inf => {
          return (
            <div style={{ backgroundColor: "pink" }} className='cont' key={inf._id}>
              <select onChange={(e) => handleChange(inf._id, e)} value={inf.status}>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Selected">Selected</option>
              </select>

              <a
                href={`http://localhost:5000/${inf.resume}`}
                target="_blank"
              >
                View Resume
              </a>
              <h3>Email: {inf.user_id?.email}</h3>
              <h3>Job title: {inf.job_id?.title}</h3>
              <h3>{inf.job_id?.salary}</h3>
              <h3>{inf.job_id?.qualification}</h3>
              <h3>{inf.job_id?.yearsOfExp}</h3>
              <h3>{inf.job_id?.jobDesc}</h3>
              <h3>{inf.job_id?.skills}</h3>
            </div>
          )
        })
      }
    </div>
  )
}

export default ApplicantsAdmin