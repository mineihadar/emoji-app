import React, { useEffect, useRef, useState } from "react";
import "./EmojiGrid.css";
import emojiData from "./emoji_data_clean.json";

const EmojiGrid = () => {
  const [scrolled, setScrolled] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderColumn = (weekData, index) => (
    <div className='week-column' key={index}>
      {weekData.map((emoji, idx) => (
        <div className='emoji' key={idx}>
          {emoji}
        </div>
      ))}
    </div>
  );

  return (
    <div className='scrollable-emojis'>
      <div
        ref={gridRef}
        className={`emoji-grid-container ${scrolled ? "scrolled" : ""}`}>
        {emojiData.map((week, index) => renderColumn(week, index))}
      </div>
      <div className='week-info'>
        <p className='year'>2023</p>
        <p className='week'>3 באפריל - 8 באפריל</p>
      </div>
    </div>
  );
};

export default EmojiGrid;
