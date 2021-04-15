import React,{useState,useEffect,useRef} from 'react'
import "../styles/publicspace.css";
import useFirestore from "../hooks/useFirestore";
import firebase from "firebase";
import {db} from "../firebase";
import AOS from "aos";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function PublicSpace() {
    
    const [value,setValue]=useState("recent");
    const [category,setCategory]=useState("General");
    const modalRef=useRef();
    const closeBtn=useRef();
    
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


    const {docs,setDocs}=useFirestore("images");

    //Using Local storage to improve the bandwidth usage
    useEffect(() => {
        AOS.init({duration:2000});
        var list=localStorage.getItem("docsList");
        if(list)
        {
            setDocs(JSON.parse(list));
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("docsList",JSON.stringify(docs));
    }, [docs])


    const handleClick=()=>{
        modalRef.current.style.display="block";

        closeBtn.current.onclick=function()
        {
            modalRef.current.style.display="none";
        }
        
    }

    const handleFilters=(e)=>{
        e.preventDefault();
        if(value==="recent")
        {
            const recentDocs=docs.filter(doc=>doc.category===category).sort((doc1,doc2)=>doc2.createdAt-doc1.createdAt);
            setDocs(recentDocs);
        }
        else
        {
            const mostLikedDocs=docs.filter(doc=>doc.category===category).sort((doc1,doc2)=>doc2.likeCount-doc1.likeCount);
            setDocs(mostLikedDocs);
        }


    }
    return (
        <div className="publicspace">
            
            <span className="secondary">Pictures Uploaded till now : {docs.length}</span>


            <button className="add-filters" disabled={!docs} onClick={handleClick}> Add Filters </button>


            <div ref={modalRef} className="modal" id="modal">
                <span ref={closeBtn} className="close">&times;</span>
                
                <form onSubmit={handleFilters}>
                    <label style={{fontSize:"0.80rem",fontWeight:"bold"}} >Choose Category : </label>
                            <select  name="category" id="category" value={category} onChange={e=>setCategory(e.target.value)}>
                               
                                <option value="General">General</option>
                                <option value="Food">Food</option>
                                <option value="Nature">Nature</option>
                                    
                            </select>

                            <RadioGroup aria-label="sort" name="sort" value={value} onChange={e=>setValue(e.target.value)}>
                                <FormControlLabel value="recent" control={<Radio />} label="Most Recent" />
                                <FormControlLabel value="likes" control={<Radio />} label="Most Liked" />
                            </RadioGroup>

                            <button type="submit">Apply Filters</button>

                </form>
            </div>

            {docs && 

            
            <div className="image-grid">
               {docs.map((doc)=>(
                    <div data-aos="fade-up" key={doc.id} className="image-card">
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
 