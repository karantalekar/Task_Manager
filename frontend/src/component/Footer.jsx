import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
