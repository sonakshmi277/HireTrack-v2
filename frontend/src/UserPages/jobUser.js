import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
        setInfo(data)
         console.log(data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      {
        info.map(inf => {
          return (
            <div style={{ backgroundColor: "pink" }} className='cont' key={inf._id}>
              <p>{inf.status}</p>

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

export default JobUser