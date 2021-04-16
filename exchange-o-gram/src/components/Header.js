import React from 'react'
import "../styles/header.css";
import {Link} from "react-router-dom";
function header() {
    return (
        <div className="header">
            <h2 className="title">Exchange-o-Gram <span> 📸 </span></h2>
            <div className="header__elements">
                
                <span>
                    <Link to="/">Home</Link>
                </span>
                <span><Link to="/login">My Space</Link></span>
            </div>
        </div>
    )
}

export default header
