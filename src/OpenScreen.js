import React, { useState, useEffect } from "react";
import "./OpenScreen.css"; // Make sure the CSS file is imported
import logo from "./images/emoji_logo.gif"; // Adjust the path to your logo image

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust this value based on when you want to shrink the logo
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={scrolled ? "scrolled" : ""}>
      <img src={logo} className='logo' alt='Logo' />
      <div className='textContainer'>
        <p className='openText'>
          כאן תוכלו ללמוד על טרנדים ומגמות באימוג׳ים מינואר 2023 ועד מאי 2024
          מישראל התוכן מבוסס על פוסטים מטוויטר שנאספו באמצעות Data Scraping
          ובאופן ידני בחרו שנה וחודש או התחילו לגלול כדי לחקור
        </p>
      </div>
      {/* Add content here to enable scrolling */}
      <div style={{ height: "200vh" }}></div>
    </div>
  );
}

export default App;
