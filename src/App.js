import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import EmojiGrid from "./EmojiGrid";
import EmojiImage from "./EmojiImage";
import "./App.css";
import logo from "./images/emoji_logo_static.png";
import logoHover from "./images/emoji_logo.gif";
import weeks from "./data/weeks.json";
import About from "./About";
import EmojiIndex from "./EmojiIndex";
import EventIndex from "./EventIndex";
import OpenScreen from "./OpenScreen";

function App() {
  const [isGif, setIsGif] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGif(true);
      const gifTimeout = setTimeout(() => {
        setIsGif(false);
      }, 3000);

      return () => clearTimeout(gifTimeout);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className='App'>
      <div className='header'>
        <img
          className='logo-div'
          src={isGif ? logoHover : logo}
          alt='Logo'
          onClick={handleLogoClick}
        />
        <div className='menu-options'>
          <NavLink
            to='/timeline'
            className={({ isActive }) => (isActive ? "active" : "")}>
            ציר זמן
          </NavLink>
          <NavLink
            to='/events'
            className={({ isActive }) => (isActive ? "active" : "")}>
            אירועים
          </NavLink>
          <NavLink
            to='/emojis'
            className={({ isActive }) => (isActive ? "active" : "")}>
            אימוג׳ים
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? "active" : "")}>
            על הפרויקט
          </NavLink>
        </div>
      </div>
      <div style={{ height: "100%" }}>
        <Routes>
          <Route path='/timeline' element={<EmojiGrid weeks={weeks} />} />
          <Route path='/events' element={<EventIndex />} />
          <Route path='/events/:eventName' element={<EmojiImage />} />
          <Route path='/emojis' element={<EmojiIndex />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<EmojiGrid weeks={weeks} />} />{" "}
          {/* Default route */}
        </Routes>
      </div>
      {location.pathname === "/" && <OpenScreen />}{" "}
      {/* Render OpenScreen only at the main address */}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
