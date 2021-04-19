import React,{useContext} from 'react'
import "../styles/header.css";
import {Link} from "react-router-dom";
import {usercontext} from "../hooks/UserContext";

function Header() {
    const [user,setUser]=useContext(usercontext);
    return (
        <div className="header animate__animated animate__fadeIn">
            <h2 className="title">Exchange-o-Gram <span> 📸 </span></h2>
            <div className="header__elements">
                
                <span>
                    <Link style={{textDecoration:"none",color:"white",fontWeight:"bold"}} to="/">Home</Link>
                </span>
                <span><Link style={{textDecoration:"none",color:"white",fontWeight:"bold"}} to="/login">{user?"My Space":"Log In"}</Link></span>
            </div>
        </div>
    )
}

export default Header
