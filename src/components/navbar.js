import React from 'react';
import logo from '../assets/zooftware_logo(corregido).png';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
    </nav>
  );
};

export default Navbar;
