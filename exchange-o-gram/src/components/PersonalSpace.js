import React,{useState,useEffect} from 'react'
import Login from "./login";
import {firebaseApp} from "../firebase";
function PersonalSpace() {
    const [user,setUser]=useState("");
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
        console.log("Login clicked");
        clearErrors();
         firebaseApp
         .auth()
         .signInWithEmailAndPassword(email,password)
         .catch(err=>
            {
                switch(err.code)
                {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);           
                        break;
                    }
            })
    }
    

    const handleSignup=()=>{
        console.log("Signup clicked");
        clearErrors();
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err=>
           {
               switch(err.code)
               {
                   case "auth/email-already-in-use":
                   case "auth/invalid-email":
                   
                       setEmailError(err.message);
                       break;
                   case "auth/weak-password":
                       setPasswordError(err.message);           
                       break;
                   }
           })

   }


   const handleLogOut=()=>{
     firebaseApp.auth().signOut();
     alert("You have been logged out!");
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
        <div>
            {user?(<button onClick={handleLogOut}>Log Out</button>):
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
            />)
            }
        </div>
    )
}

export default PersonalSpace
