import React,{useEffect} from 'react'
import usePersonalFirestore from "../hooks/usePersonalFirestore";
import "../styles/publicspace.css";

function PersonalImageGrid(email) 
{
    
    const {docs,setDocs}=usePersonalFirestore("personalimages",email);
    
    return (
        <div>
           {docs && 

            

            <div className="image-grid">
            {docs.map((doc)=>(
                <div key={doc.id} className="image-card">
                    <img src={doc.url}/>
                    <h4> {doc.title}</h4>
                     
                </div>    
   ))}  
        </div>}
    </div>
    )
}

export default PersonalImageGrid
