import React,{useState,useEffect} from 'react'
import "../styles/publicspace.css";
import useFirestore from "../hooks/useFirestore";
import firebase from "firebase";
import {db} from "../firebase";
function PublicSpace() {
    
    
    const updateLikeCounter=(id)=>{
        const increment=firebase.firestore.FieldValue.increment(1);
        db.collection("images").doc(id).update({likeCount:increment});
        const btnref=document.getElementById(id);
        btnref.innerHTML="Liked";
        btnref.style.color="#D1D5DB";
        btnref.style.borderColor="#D1D5DB";
        btnref.disabled=true;
        
    }
{/*
    const decreaseLikeCounter=(id)=>{
        const decrement=firebase.firestore.FieldValue.increment(-1);
       
        db.collection("images").doc(id).update({likeCount:decrement});
        setLikeStatus(false);
    }
*/} 
    const {docs}=useFirestore("images");
    return (
        <div className="publicspace">
            
            <span className="secondary">Pictures Uploaded till now : {docs.length}</span>

            {docs && 
            <div className="image-grid">
               {docs.map((doc)=>(
                    <div key={doc.id} className="image-card">
                       <img src={doc.url}/>
                       <h4>Uploaded By : {doc.user}</h4>
                       <h5>Liked By {doc.likeCount} people </h5>
                       <div className="choices">
                            <button id={doc.id} className="likeBtn" onClick={()=>updateLikeCounter(doc.id)}>Like</button>
                            
                       </div>    
                    </div>    
               ))} 

            
            </div>    
}
        </div>
    )
}

export default PublicSpace
 