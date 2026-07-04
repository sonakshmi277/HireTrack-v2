import React, { useState } from 'react'
import "./jobAdmin.css";
import PostNewJobAdmin from './postNewJobAdmin';

function JobsAdmin() {
    return (

        <div className='containers'>
            <PostNewJobAdmin/>
        </div>
    )
}

export default JobsAdmin