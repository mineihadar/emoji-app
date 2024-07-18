import React, { useRef, useEffect, useMemo } from "react";
import "./OpenScreen.css"; // Make sure the CSS file is imported
import { gsap } from "gsap";
import BigLogo from "./images/big_logo.gif"; // Ensure this is the correct import

function Logo() {
  return (
    <div style={{ height: "100vh", bottom: "auto" }}>
      <img src={BigLogo} />
    </div>
  );
}

export default Logo;
