import React from "react";
import "./OpenScreen.css"; // Make sure the CSS file is imported
import BigLogo from "./images/big_logo.gif"; // Ensure this is the correct import

function Logo() {
  return (
    <div style={{ height: "100vh", bottom: "auto" }}>
      <img src={BigLogo} alt='logo' />
    </div>
  );
}

export default Logo;
