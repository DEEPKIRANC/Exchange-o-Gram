import {useState,useEffect} from "react";
import {db} from "../firebase";
function usePersonalFirestore(collection,email) {
    const [docs,setDocs]=useState([]);
    
    useEffect(() => {
        const unsub=db.collection(collection).where("email","==",email).onSnapshot((snap)=>{
        let documents = [];
        snap.forEach(doc=>{documents.push({...doc.data(),id:doc.id});    
        }) ;
        setDocs(documents);
    });
        return () => unsub();
    }, [collection,email])
    
    return {docs,setDocs}
}

export default usePersonalFirestore
