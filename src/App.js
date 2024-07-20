import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmojiGrid from "./EmojiGrid";
import EmojiImage from "./EmojiImage";
import "./App.css";
import logo from "./images/emoji_logo_static.png";
import logoHover from "./images/emoji_logo.gif"; // Add your hover logo image here
import weeks from "./data/weeks.json";
import About from "./About";
import EmojiIndex from "./EmojiIndex";
import EventIndex from "./EventIndex";
import Logo from "./Logo";

function App() {
  const [isGif, setIsGif] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGif(true);
      const gifTimeout = setTimeout(() => {
        setIsGif(false);
      }, 2500); // Duration to show the GIF (2 seconds)

      return () => clearTimeout(gifTimeout); // Clean up the timeout on component unmount
    }, 10000); // Toggle every 20 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <Router>
      <div className='App'>
        <div className='header'>
          <img className='logo-div' src={isGif ? logoHover : logo} alt='Logo' />
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
            <Route path='/events' element={<EventIndex />} />
            <Route path='/events/:eventName' element={<EmojiImage />} />
            <Route path='/emojis' element={<EmojiIndex />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Logo />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
