import React,{useRef} from 'react'
import "../styles/uploader.css"
function Uploader() {
    const divModal=useRef();
    const closeBtn=useRef();
    const openUploader=()=>{
        console.log(divModal);
        divModal.current.style.display="block";
        closeBtn.current.onclick=function()
        {
            divModal.current.style.display="none";
            
        }
    }
    return (
        <div className="uploadSection">
                <h3>Welcome To <i>Exchange-o-Gram</i></h3>
                
                
                <div className="ideaInfo">
                    <p>This app is inspired by the idea of Billy (from the movie "The Internship") , where he proposed this idea of building an app which would allow the users to instantaneously click photos and share <b>on-the-line(online)</b>😉.
                    So upload your pictures in our public space and get appreciated from people all around the world. The picture with highest number of likes will remain on top. </p>
                                 
                </div>
                <h5>(Click on below icon to upload a picture)</h5>
                <button className="openBTN" onClick={openUploader}>+</button>
               
            <div ref={divModal} id="modal" className="uploaderModal">
                
                <form>
                    <span ref={closeBtn} className="close">&times;</span>
                    <div className="upload__image">
                        <input  type="file"/>
                        <button>Upload Picture</button>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Uploader
