import React from 'react'
import {useEffect} from "react"

import usePersonalStorage from '../hooks/usePersonalStorage'


function PersonalProgressBar({file,setfile,emailID,title,setTitle,setModal}) {
    const {url,progress}=usePersonalStorage(file,emailID,title);

    useEffect(()=>{
        if(url)
        {
            setfile(null);
            setTitle('');
            setModal(false);
        }
    },[url,setfile,setTitle,setModal])
    
    return (
        <div style={{padding:"1rem"}}>
            <div style={{height:"5px",backgroundColor:"black",width:progress + "%"}}>Uploading</div>
        </div>
    )
}

export default PersonalProgressBar
