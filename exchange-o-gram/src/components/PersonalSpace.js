import React,{useState,useEffect} from 'react'
import Login from "./login";
import {auth} from "../firebase";
function PersonalSpace() {
    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [hasAccount,setHasAccount]=useState(false);
    


    const handleLogin=()=>{
         auth
         .auth()
         .signInWithEmailAndPassword(email,password)
         .catch(err=>
            {
                switch(err.code)
                {
                    case "auth-invalid-email":
                    case "user-disabled":
                    case "user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong password":
                        setPasswordError(err.message);           
                        break;
                    }
            })
    }
    
    return (
        <div>
            {!user &&
            <Login
            user={user}
            setUser={setUser}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            emailError={emailError}
            setEmailError={setEmailError}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            />
            }
        </div>
    )
}

export default PersonalSpace
