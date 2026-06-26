import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom";

function AdminHomePage() {
  const navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem("token");
    fetch("http://localhost:5000/adminHomePage",
      {
        method:"GET",
        headers:{authorization:token}
      }
    )
    .then(res=>{
      if(res.status===401){
        navigate("/admin");
        return;
      }
      return res.json();
    })
    .then(data=>{
      if(data){
        console.log(data);
      }
    
    })
    .catch((err)=>console.log(err));
  },[]);

  return (
    <div>Admin Home Page</div>
  )
}

export default AdminHomePage