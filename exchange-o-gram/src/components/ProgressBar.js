import React from 'react'
import {useEffect} from "react"

import useStorage from '../hooks/useStorage'


function ProgressBar({file,setfile,user,category,setUser,setModal}) {
    const {url,progress}=useStorage(file,user,category);

    useEffect(()=>{
        if(url)
        {
            setfile(null);
            setUser('');
            setModal(false);
        }
    },[url,setfile,setUser,setModal])
    
    return (
        <div style={{padding:"1rem"}}>
            <div style={{height:"5px",backgroundColor:"black",width:progress + "%"}}>Uploading</div>
        </div>
    )
}

export default ProgressBar
