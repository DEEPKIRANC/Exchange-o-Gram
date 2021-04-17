import React,{useEffect} from 'react'
import usePersonalFirestore from "../hooks/usePersonalFirestore";
import "../styles/publicspace.css";
import DeleteIcon from '@material-ui/icons/Delete';
import {db}  from "../firebase";

function PersonalImageGrid(email) 
{
    
    const {docs,setDocs}=usePersonalFirestore("personalimages",email);
    
    const deleteImage=(id)=>{
        db.collection("personalimages").doc(id).delete().then(()=>{
            alert("Image deleted successfully!");
        })
        .catch(()=>{
            alert("An Error occurred while deleting the image.");
        })
    }

    const style1={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"1rem"
    }
    return (
        <div>
           {docs && 

            

            <div className="image-grid">
            {docs.map((doc)=>(
                <div key={doc.id} className="image-card">
                    <img src={doc.url}/>
                    <h4> {doc.title}</h4>
                    <div style={style1}>
                        <span style={{fontSize:"0.6rem"}}>(Click on this icon to delete the image)</span>
                        <DeleteIcon style={{cursor:"pointer"}} onClick={()=>deleteImage(doc.id)} /> 
                    </div>
                </div>    
   ))}  
        </div>}
    </div>
    )
}

export default PersonalImageGrid
