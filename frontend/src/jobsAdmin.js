import React, { useState } from 'react'
import "./jobAdmin.css";
import PostNewJobAdmin from './postNewJobAdmin';
import JobPostedAdmin from "./jobPostedAdmin";

function JobsAdmin() {
    const [showForm, setShowForm] = useState(false);
    const [showPost,setShowPost]=useState(false)
    return (

        <div className='containers'>
            <div className='options'>
                <div className="option1" onMouseOver={()=>{setShowForm(true); setShowPost(false);}}>
                    Post new job
                </div>
                <div className="option2" onMouseOver={()=>{setShowPost(true); setShowForm(false);}}>
                    Posted Jobs
                </div>
            </div>
            <div className='content'>
                {showForm && (<div className='contentNewJob'>
                    <PostNewJobAdmin/>
                </div>)}
                {showPost && (<div className='contentJobPosted'>
                    <JobPostedAdmin/>
                </div>)}
            </div>

        </div>
    )
}

export default JobsAdmin