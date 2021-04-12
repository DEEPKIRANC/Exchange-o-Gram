import React from 'react'
import "../styles/header.css";
function header() {
    return (
        <div className="header">
            <h2 className="title">Exchange-o-Gram <span> 📸 </span></h2>
            <div className="header__elements">
                <span>Home</span>
                <span>My Space</span>
            </div>
        </div>
    )
}

export default header
