import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Navbar() {
    return (


        <nav className="navbar navbar-expand-lg text-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Google Books</Link>
                <ul className="navbar-nav">
                    <li className="nav-item" id="nav-item-1">
                        <Link
                            to="/search"
                            className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
                        > Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/saved"
                            className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                        >Saved</Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}

export default Navbar;