import React,{useState,useEffect,useContext} from 'react'
import Login from "./login";
import {firebaseApp} from "../firebase";
import PersonalUploader from "./PersonalUploader";
import PersonalImageGrid from './PersonalImageGrid';
import {usercontext} from "../hooks/UserContext";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PersonalSpace() {
    
    const [user,setUser]=useContext(usercontext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [hasAccount,setHasAccount]=useState(false);
    
    

    const clearInputs=()=>{
        setEmail('');
        setPassword('');
    }

    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin=()=>{
        
        clearErrors();
         firebaseApp
         .auth()
         .signInWithEmailAndPassword(email,password)
         .then(()=>{
            toast.success('Login Successfull!',{position:"top-center"});
         })
         .catch(err=>
            {
                switch(err.code)
                {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        clearInputs();
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        clearInputs();           
                        break;
                    }
            })
           
        }
    

    const handleSignup=()=>{
       // console.log("Signup clicked");
        clearErrors();
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(()=>{
            toast.success('Signed Up Successfully!',{position:"top-center"});
        })
        .catch(err=>
           {
               switch(err.code)
               {
                   case "auth/email-already-in-use":
                   case "auth/invalid-email":
                   
                       setEmailError(err.message);
                       clearInputs();
                       break;
                   case "auth/weak-password":
                       setPasswordError(err.message);           
                       clearInputs();
                       break;
                   }
           })
          
   }


   const handleLogOut=()=>{
     firebaseApp.auth().signOut();
     toast.dark('Signed out!',{position:"top-center"});

   }

   const authListener=()=>{
       firebaseApp.auth().onAuthStateChanged((user)=>{
           if(user)
           {
               clearInputs();
               setUser(user);
               
           }
           else
           {
               setUser("");
           }
       });
   };

   useEffect(()=>{
       authListener();
   },[]);
    return (
        <>
        <div>
            {user?(
            <div>    
            <button style={{marginTop:"1rem",cursor:"pointer",outline:"none",padding:"0.5rem",backgroundColor:"black",color:"white"}}onClick={handleLogOut}>Log Out</button>
           
            <PersonalUploader email={user.email}/>

            <PersonalImageGrid email={user.email}/>    
            </div>
            ):
            (
               
            <Login
            user={user}
            setUser={setUser}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            
            emailError={emailError}
            
            passwordError={passwordError}
            
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            />
           )
            }
        </div>
        <ToastContainer/>
        </>
    )
}

export default PersonalSpace
