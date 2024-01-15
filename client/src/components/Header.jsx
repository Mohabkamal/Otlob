import React, { useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  // State to manage the drawer's open/close state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer's state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header style={headerStyle}>
        {/* Logo container with click event to toggle the drawer */}
        <div style={logoContainer} onClick={toggleDrawer}>
          <img src={logo} alt="Logo" style={logoStyle} />
        </div>
        {/* Title link */}
        <a href="/" style={titleStyle}>
          Lieferspatz
        </a>
        {/* Icon link */}
        <a href="/myorders" style={iconContainer}>
          🚚
        </a>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        // Overlay to cover the entire screen and close the drawer on outside click
        <div onClick={closeDrawer} style={overlayStyle}>
          <nav style={drawerStyle}>
            {/* Close button */}
            <span style={closeButtonStyle} onClick={closeDrawer}>
              &times;
            </span>
            <a href="/login" style={linkStyle}>
              Login
            </a>
            <a href="/restaurantlogin" style={linkStyle}>
              Restaurant Login
            </a>
            <a href="/registration" style={linkStyle}>
              Register
            </a>
            <a href="/restaurantregister" style={linkStyle}>
              Restaurant Register
            </a>
            <a href="/myorders" style={linkStyle}>
              My Orders
            </a>
            <a href="/restaurantorders" style={linkStyle}>
              Restaurant Orders
            </a>
            <a href="/admin" style={linkStyle}>
              Admin
            </a>
            <a href="/menu" style={linkStyle}>
              Menu
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

// Styles
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
  cursor: "pointer",
};

const logoStyle = {
  width: "50px",
  height: "50px",
};

const titleStyle = {
  flexGrow: 1,
  fontSize: "20px",
  textDecoration: "none",
  color: "white",
};

const iconContainer = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "24px",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
};

const drawerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "40vw",
  height: "100%",
  backgroundColor: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  color: "#000",
  zIndex: 2,
};

const linkStyle = {
  textDecoration: "none",
  color: "#000",
  fontSize: "18px",
  padding: "10px 0",
  cursor: "pointer",
};

const closeButtonStyle = {
  color: "#000",
  fontSize: "24px",
  alignSelf: "flex-end",
  cursor: "pointer",
  marginBottom: "20px",
};

export default Header;
