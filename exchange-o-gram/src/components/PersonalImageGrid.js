import React,{useEffect} from 'react'
import usePersonalFirestore from "../hooks/usePersonalFirestore";
import "../styles/publicspace.css";
import DeleteIcon from '@material-ui/icons/Delete';
import {db}  from "../firebase";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonalImageGrid(email) 
{
    // retrieve images from firestore hook
    const {docs,setDocs}=usePersonalFirestore("personalimages",email);
    
    // function to delete the images
    const deleteImage=(id)=>{
        db.collection("personalimages").doc(id).delete().then(()=>{
            toast.success("Picture deleted successfully",{position:"top-right"});
        })
        .catch(()=>{
            toast.error("An Error occurred while deleting the image",{position:"top-right"});
                    })
    }

    const style1={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"1rem"
    }
    return (
        <>
        <div>
           {docs && 

            

            <div className="image-grid">
            {docs.map((doc)=>(
                <div key={doc.id} className="image-card">
                    <img className="animate__animated animate__fadeInUp" src={doc.url}/>
                    <h4> {doc.title}</h4>
                    <div style={style1}>
                        <span style={{fontSize:"0.6rem"}}>(Click on this icon to delete the image)</span>
                        <DeleteIcon style={{cursor:"pointer"}} onClick={()=>deleteImage(doc.id)} /> 
                    </div>
                </div>    
   ))}  
        </div>}
    </div>
    <ToastContainer/>
    </>
    )
}

export default PersonalImageGrid
