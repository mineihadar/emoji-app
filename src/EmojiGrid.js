import React, { useEffect, useRef, useState } from "react";
import "./EmojiGrid.css";
import emojiData from "./emoji_data_clean.json";

const EmojiGrid = ({ weeks }) => {
  const gridRef = useRef(null);
  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px -45% 0px", // Adjust rootMargin to trigger in the middle of the screen
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleColumnIndex(parseInt(entry.target.dataset.index));
        }
      });
    }, options);

    const columns = document.querySelectorAll(".week-column");
    columns.forEach((column, index) => {
      column.dataset.index = index;
      observer.observe(column);
    });

    return () => {
      columns.forEach((column) => {
        observer.unobserve(column);
      });
    };
  }, []);

  const renderColumn = (weekData, week, index) => (
    <div
      className={`week-column ${index === visibleColumnIndex ? "visible" : ""}`}
      key={index}>
      <div className='week-emoji-container'>
        <div className='emoji-row'>
          {weekData.map((emoji, idx) => (
            <div className='emoji' key={idx}>
              {emoji}
            </div>
          ))}
        </div>
        {week && (
          <div className='week-info'>
            <p className='week'>{week.text}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='scrollable-emojis' ref={gridRef}>
      <div className='emoji-grid-container'>
        {emojiData.map((weekData, index) =>
          renderColumn(weekData, weeks[index], index)
        )}
      </div>
    </div>
  );
};

export default EmojiGrid;
