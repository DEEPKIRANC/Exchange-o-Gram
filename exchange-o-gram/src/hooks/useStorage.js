import  {useState,useEffect} from "react";
import firebase from "firebase"
import {projectStorage,db} from "../firebase";

function useStorage(file,username,category) {
    const [url,setUrl]=useState(null);
    const [error,setError]=useState(null);
    const [progress,setProgress]=useState(0);    

    useEffect(()=>{


     const storageRef=projectStorage.ref(file.name);
     
     storageRef.put(file).on('state_changed',(snap)=>{

        let percentage=(snap.bytesTransferred/snap.totalBytes)*100;
        setProgress(percentage);
     },(err)=>{
         setError(err);
     },async()=>{
         const url=await storageRef.getDownloadURL();
         db.collection("images").add({'url':url,
            'user':username,
            'category':category,
            'likeCount':[],
            'createdAt':firebase.firestore.FieldValue.serverTimestamp()
        });    
         setUrl(url);
     })



    },[file,username,category])

    return {progress,url,error}
}

export default useStorage
