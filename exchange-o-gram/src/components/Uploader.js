import React,{useState,useRef} from 'react';
import ProgressBar from "./ProgressBar";

import "../styles/uploader.css";
function Uploader() {
    const [username,setUsername]=useState("");
    const [file,setFile]=useState(null);
    const [category,setCategory]=useState("General");
    const [modalState,setModalstate]=useState(false);
    const [error,setError]=useState("");


    const MAX_WIDTH = 320;
    const MAX_HEIGHT = 320;
    const MIME_TYPE = "image/jpeg";
    const QUALITY =1.0;

    const types=["image/png","image/jpeg"];

    const fileRef=useRef();
    const divModal=useRef();
    const closeBtn=useRef();
    const openUploader=()=>{
        console.log(divModal);
        divModal.current.style.display="block";
        fileRef.current.value=null;
        closeBtn.current.onclick=function()
        {
            divModal.current.style.display="none";
            
        }
    }

    //

    function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;
      
        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        return [width, height];
      }
      

    //handling Images

    const changeHandler=(e)=>{
        let selected=e.target.files[0];
        console.log(selected);
        if(selected && types.includes(selected.type))
        {
            // code for image compression
            const blobURL = URL.createObjectURL(selected);
            const img = new Image();
            img.src = blobURL;
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
                img.onload = function () {
                    URL.revokeObjectURL(this.src);
                    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                    const canvas = document.createElement("canvas");
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    canvas.toBlob(
                    (blob) => {
                        // blob=compressed image
                        blob.name=selected.name;
                        setFile(blob);
                    }
                        ,
                    MIME_TYPE,
                    QUALITY
                    );


                }

           
            
            setError("");
            console.log(file);
        }
        else
        {
            setFile(null);
            setError('Please select a valid image file(png/jpeg)');
        }
    }




    //form submission for image upload




    const submitImage=(e)=>{
        e.preventDefault();
        divModal.current.style.display="none";
        console.log("User" ,username , "Category : ",category);
        setModalstate(true);
    
    }



    return (
        <div className="uploadSection">
                <h3>Welcome To <i>Exchange-o-Gram</i></h3>
                
                
                <div className="ideaInfo">
                    <p>This app is inspired by the idea of Billy (from the movie "The Internship") , where he proposed this idea of building an app which would allow the users to instantaneously click photos and share <b>on-the-line(online)</b>😉.
                    So upload your pictures in our Public Space and get appreciated from people all around the world. You can also check out <b>My Space </b> Section to store personal memories.  </p>
                                 
                </div>
                <h5>(Click on below icon to upload a picture)</h5>
                <button className="openBTN" onClick={openUploader}>+</button>

                {(file && modalState) && <ProgressBar
                 file={file} 
                 setfile={setFile}
                 user={username} 
                 category={category} 
                 setUser={setUsername} 
                 setCategory={setCategory} 
                 setModal={setModalstate}
                 />}

            <div ref={divModal} id="modal" className="uploaderModal">
                
                <form onSubmit={submitImage}>
                    <span ref={closeBtn} className="close">&times;</span>
                    <div className="upload__image">
                        <input ref={fileRef} type="file" onChange={changeHandler}/>
                        <input required="required" value={username} onChange={(e)=>setUsername(e.target.value)} style={{paddingLeft:"0.5rem"}} type="text" placeholder="Uploaded By.." />
                        <div>
                            <label style={{fontSize:"0.80rem",fontWeight:"bold"}} >Choose a category : </label>
                            <select  name="category" id="category" value={category} onChange={e=>setCategory(e.target.value)}>
                                <option value="General">General</option>
                                <option value="Food">Food</option>
                                <option value="Nature">Nature</option>
                                    
                                </select>
                        </div>     
                        <button type="submit">Upload Picture</button>
                        {error && <div>{error}</div>}    
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Uploader
