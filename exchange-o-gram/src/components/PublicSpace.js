import React,{useState,useEffect,useRef,useContext} from 'react'
import "../styles/publicspace.css";
import useFirestore from "../hooks/useFirestore";
import firebase from "firebase";
import {db} from "../firebase";
import "animate.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {usercontext} from "../hooks/UserContext";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PublicSpace() {
    const [user,setUser]=useContext(usercontext);
    const [likeStatus,setLikeStatus]=useState(false);
    const [value,setValue]=useState("recent"); //filter radio button
    const [category,setCategory]=useState("General");//category dropdown
    const [copy,setCopy]=useState([]);//copy of array for applying filters
    const modalRef=useRef();
    const closeBtn=useRef();
    

    // Syntax for updating likes on a particular picture
    const updateLikeCounter=(id)=>{
        if(!user)
        {
            toast.warning('You need to login to like a picture',{position:"top-right"}); 
       
            
        }
        else
        {
            const uniqueId=user.uid;    
            var userList=docs.filter(doc=>doc.id===id).map(doc=>doc.likeCount)[0];
            if(!userList.includes(uniqueId))
            {

                db.collection("images").doc(id).update({likeCount:firebase.firestore.FieldValue.arrayUnion(uniqueId)});
              
            
                setLikeStatus(!likeStatus);
            }
            else
            {
                toast.info('You have already liked this picture',{position:"top-right"}); 
       
            }
            const btnref=document.getElementById(id);
            btnref.innerHTML="Liked";
            btnref.style.color="#D1D5DB";
            btnref.style.borderColor="#D1D5DB";
            btnref.disabled=true;
    }
        
    }


    // fetching images from Firestore
    const {docs,setDocs}=useFirestore("images");
    
    //Using Local storage to improve the bandwidth usage and storing a copy of docs returned to implement filter options!
    useEffect(()=>{
        setCopy(docs);
    },[likeStatus,docs])


    useEffect(() => {
        
        var list=localStorage.getItem("docsList");
        if(list)
        {
            setCopy(JSON.parse(list));
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("docsList",JSON.stringify(docs));
    }, [docs])


    //Event handler to open/close modal(for applying filters)
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
            setCopy(docs);
            const recentDocs=docs.filter(doc=>doc.category===category).sort((doc1,doc2)=>doc2.createdAt-doc1.createdAt);
            setCopy(recentDocs); // updating local copy (filtered version)

        }
        else
        {
            setCopy(docs);
           // console.log(copy);
            const mostLikedDocs=docs.filter(doc=>doc.category===category).sort((doc1,doc2)=>doc2.likeCount.length-doc1.likeCount.length);
            setCopy(mostLikedDocs);
        }
       setCategory("General");// setting state to default values
        setValue("recent");
        modalRef.current.style.display="none";


    }

    const handleRemove=(e)=>
    {
        console.log(docs);
        setCopy(docs); //Updating local copy to default list(without any filter)
    }
    return (
        <>
        <div className="publicspace">
            
            <span className="secondary">Pictures Uploaded till now : {copy.length}</span>


            <button className="add-filters" disabled={!docs} onClick={handleClick}> Add Filters </button>
            <button className="remove-filters" onClick={handleRemove}>Remove Filters</button>
           
            <div ref={modalRef} className="modal" id="modal">
                <span ref={closeBtn} className="close">&times;</span>
                
                <form onSubmit={handleFilters}>
                    <div className="filterForm">
                        <label style={{fontSize:"0.80rem",fontWeight:"bold"}} >Choose Category</label>
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
                    </div>
                </form>
            </div>

            {docs && 

            
            <div className="image-grid">
               {copy.map((doc)=>(
                    
                    <div  key={doc.id} className="image-card">
                       <img className="animate__animated animate__fadeInUp" src={doc.url}/>
                       <h4>Uploaded By : {doc.user}</h4>
                       <h5>Category : {doc.category}</h5>
                       <h5>Liked By {doc.likeCount.length} people </h5>
                       <div className="choices">
                            <button id={doc.id}  className="likeBtn" onClick={()=>updateLikeCounter(doc.id)}>Like</button>
                            
                       </div>    
                    </div>    
               ))} 

            
            </div>    
}
        </div>
        <ToastContainer/>
        </>
    )
}

export default PublicSpace
 