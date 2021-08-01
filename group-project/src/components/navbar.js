import React from 'react';
import { NavLink } from "react-router-dom";
import '../css/Navbar.css';

function Navbar() {
    return (
        <div className="navbardiv">
            <ul>
                <li><NavLink exact to='/' className="textdecoration">Home</NavLink></li>
                <li><NavLink to='associatespage' className="textdecoration">Associates Page</NavLink></li>
                <li><NavLink to='clerkpage' className="textdecoration">Clerks Page</NavLink></li>
                <li><NavLink to='adminpage' className="textdecoration">Admins Page</NavLink></li>
            </ul>
        </ div>
    );
}

export default Navbar