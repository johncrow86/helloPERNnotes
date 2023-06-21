import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
    const { setAuthenticated, logout } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        setAuthenticated(false);
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                    Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                    Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <button type="button" className="nav-link btn" style={{ boxShadow: "none" }} onClick={handleLogout}>
                    Logout
                    </button>
                </li>
                </ul>
            </div>
        </nav>
    );
  }
  
export default NavBar;

