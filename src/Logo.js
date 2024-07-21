import React from "react";
import "./OpenScreen.css"; // Make sure the CSS file is imported
import ReverseLogo from "./images/reverse_logo.gif"; // Ensure this is the correct import

function Logo() {
  return (
    <div style={{ height: "100vh", bottom: "auto" }}>
      <img src={ReverseLogo} alt='ReverseLogo' />
    </div>
  );
}

export default Logo;
