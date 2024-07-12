import React, { useEffect, useRef, forwardRef } from "react";
import "./EmojiGrid.css";
import emojiData from "./weekly_emojis.json";
import trends from "./trending_data.json";

const EmojiGrid = forwardRef(
  ({ weeks, onClickEmoji, visibleColumnIndex, setVisibleColumnIndex }, ref) => {
    useEffect(() => {
      const rootMargin = "-50% 0px -50% 0px"; // Symmetrical root margin
      const options = {
        root: null,
        rootMargin,
        threshold: [0, 0.5, 1], // More lenient threshold
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

    const returnWeekTrend = (week) => {
      const weekData = trends.find((weekData) => weekData.week === week);
      if (weekData) {
        return weekData.trending_words.map((trend, index) => (
          <p key={index}>{trend.includes("#") ? trend : `#${trend}`}</p>
        ));
      }
      return [];
    };

    const renderColumn = (weekData, week, index) => (
      <div
        className={`week-column ${
          index === visibleColumnIndex ? "visible" : ""
        }`}
        key={index}>
        <div className='week-emoji-container'>
          <div className='emoji-row'>
            {weekData.map((emoji, idx) => (
              <div
                className={`emoji ${
                  index === visibleColumnIndex ? "clickable" : ""
                }`}
                key={idx}
                onClick={() =>
                  index === visibleColumnIndex && onClickEmoji(emoji)
                }>
                {emoji}
              </div>
            ))}
          </div>
          {week && (
            <div className='week-info'>
              <div className='additional-text top'>
                <p className='year'>2023</p>
              </div>
              <p className='week'>{week.text}</p>
              <div className='additional-text bottom'>
                <div className='events-window'>
                  <p className='title'>אירועים שקרו בשבוע</p>
                  <div className='events'>אירוויזיון</div>
                </div>
                <div className='trends-window'>
                  <p className='title'>מילים שחזרו בשבוע</p>
                  <div className='trends'>{returnWeekTrend(week.text)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className='scrollable-emojis' ref={ref}>
        <div className='emoji-grid-container'>
          {emojiData.map((weekData, index) =>
            renderColumn(weekData, weeks[index], index)
          )}
        </div>
      </div>
    );
  }
);

export default EmojiGrid;
