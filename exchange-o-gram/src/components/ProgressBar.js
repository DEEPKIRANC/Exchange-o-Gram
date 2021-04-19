import React from 'react'
import {useEffect} from "react"

import useStorage from '../hooks/useStorage'


function ProgressBar({file,setfile,username,category,setUsername,setModal}) {
    const {url,progress}=useStorage(file,username,category);

    useEffect(()=>{
        if(url)
        {
            setfile(null);
            setUsername('');
            setModal(false);
        }
    },[url,setfile,setUsername,setModal])
    
    return (
        <div style={{padding:"1rem"}}>
            <div style={{height:"5px",backgroundColor:"black",width:progress + "%"}}>Uploading</div>
        </div>
    )
}

export default ProgressBar
