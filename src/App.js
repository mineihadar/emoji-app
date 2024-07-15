import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmojiGrid from "./EmojiGrid";
import EmojiImage from "./EmojiImage";
import "./App.css";
import logo from "./images/emoji_logo.gif";
import weeks from "./weeks.json";
import Events from "./Events";
import About from "./About";

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='header'>
          <img className='logo-div' src={logo} alt='Logo' />
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
            <Route path='/events' element={<Events />} />
            <Route path='/emojis' element={<EmojiImage />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<EmojiImage />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
