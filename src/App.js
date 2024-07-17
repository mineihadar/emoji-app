import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmojiGrid from "./EmojiGrid";
import EmojiImage from "./EmojiImage";
import "./App.css";
import logo from "./images/emoji_logo_static.png";
import logoHover from "./images/emoji_logo.gif"; // Add your hover logo image here
import weeks from "./data/weeks.json";
import Events from "./Events";
import About from "./About";
import EmojiIndex from "./EmojiIndex";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Router>
      <div className='App'>
        <div className='header'>
          <img
            className='logo-div'
            src={isHovered ? logoHover : logo}
            alt='Logo'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className='menu-options'>
            <Link to='/timeline'>ציר זמן</Link>
            <Link to='/events'>אירועים</Link>
            <Link to='/emojis'>אימוג׳ים</Link>
            <Link to='/about'>על הפרויקט</Link>
          </div>
        </div>
        <div style={{ height: "100%" }}>
          <Routes>
            <Route path='/timeline' element={<EmojiGrid weeks={weeks} />} />
            <Route path='/events' element={<EmojiImage />} />
            <Route path='/emojis' element={<EmojiIndex />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<EmojiImage />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
