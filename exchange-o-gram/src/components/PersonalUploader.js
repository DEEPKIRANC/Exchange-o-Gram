import React,{useState,useRef} from 'react';
import PersonalProgressBar from "./PersonalProgressBar";
import "../styles/uploader.css";

function PersonalUploader(email) {
    
    const [file,setFile]=useState(null);
    const [title,setTitle]=useState();
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
        console.log("Email" ,email , "Title : ",title);
        setModalstate(true);
    
    }



    return (
        <div className="uploadSection">
                <h3>Welcome To <i style={{color:"#DB2777"}}>Exchange-o-Gram's</i> Personal Space</h3>
                
                
                <div className="ideaInfo">
                    <p style={{textAlign:"center"}}>Upload pictures , add a note and save you personal memories here ! </p>
                                 
                </div>
                <h5>(Click on below icon to upload a picture)</h5>
                <button className="openBTN" onClick={openUploader}>+</button>

                {(file && modalState) && <PersonalProgressBar
                 file={file} 
                 setfile={setFile}
                 emailID={email} 
                 title={title} 
                 setTitle={setTitle}  
                 setModal={setModalstate}
                 />}

            <div ref={divModal} id="modal" className="uploaderModal">
                <span ref={closeBtn} className="close">&times;</span>
                <form onSubmit={submitImage}>
                    
                    <div className="upload__image">
                        <input ref={fileRef} type="file" onChange={changeHandler}/>
                        <input required="required" value={title} onChange={(e)=>setTitle(e.target.value)} style={{paddingLeft:"0.5rem"}} type="text" placeholder="Add a Note" />
                        <button type="submit">Upload Picture</button>
                        {error && <div>{error}</div>}    
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default PersonalUploader

