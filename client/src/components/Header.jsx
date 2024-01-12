import React from "react";
import logo from "../assets/logo.png"
const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoContainer}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>
      <a href="/" style={titleStyle}>Lieferspatz</a>
      <a href="/myorders" style={iconContainer}>
        🚚
      </a>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
};

const logoContainer = {
  marginRight: "10px",
};

const logoStyle = {
  width: "50px",
  height: "50px",
};

const titleStyle = {
  flexGrow: 1,
  fontSize: "20px",
  textDecoration: 'none', 
  color: 'white',
};

const iconContainer = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "24px",
};

export default Header;
