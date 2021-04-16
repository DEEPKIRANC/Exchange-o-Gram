import React from 'react'
import "../styles/login.css";

function login(props) {
    const {user,setUser,email,setEmail,password,setPassword,handleLogin,handleSignup,emailError,passwordError,hasAccount,setHasAccount}=props;
    
    return (
        <section className="login">
        <div className="loginContainer">
            <label>Username</label>
            <input type="text" autofocus required value={email} onChange={e=>setEmail(e.target.value)} />
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input type="password"  required value={password} onChange={e=>setPassword(e.target.value)} />
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                {hasAccount?
                <>
                <button className="logBtn" onClick={handleLogin}>Sign In</button>
                <p>Don't have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
                </>:<>
                <button className="logBtn" onClick={handleSignup}>Sign Up</button>
                <p>Have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign In</span></p>
                
                </>
            
            }
            </div>    
        </div>
        </section>
    )
}

export default login
