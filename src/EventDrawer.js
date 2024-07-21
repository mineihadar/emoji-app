import React from "react";
import "./EventDrawer.css"; // Add your styles here
import NavigationButton from "./NavigationButton";

const EventDrawer = ({ open, onClose, details }) => {
  return (
    <div className={`event-drawer ${open ? "open" : ""}`} onClick={onClose}>
      <div className='info-frame'>
        <div className='left-icon-frame' onClick={onClose}>
          <span className='left-close-icon'>&rarr;</span>
        </div>
        <div className='event-id'>
          <div className='event-title'>
            <h3>{details.id.name}</h3>
            <p>{details.id.date}</p>
          </div>

          <p className='event-about'>{details.id.about}</p>
        </div>

        {/* Sentiment */}
        <div className='emoji-info'>
          <div style={{ display: "flex", gap: "0.8vw" }}>
            {Object.entries(details.sentiment).map(([key, value], subIndex) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.2vw",
                  alignItems: "flex-end",
                }}
                key={subIndex}>
                <p className='info-value-number'>{value}%</p>
                <p className='info-value'>{key}</p>
              </div>
            ))}
          </div>
          <div className='event-category'>
            <p className='info-category'>סנטימנט</p>
            <p className='explain-category'>הקשר רגשי נלווה לפוסטים</p>
          </div>
        </div>

        {/* Common Hashtags */}
        {details.common_hashtags.length !== 0 && (
          <div className='section-info'>
            <div className='list-hashtags'>
              {details.common_hashtags.map((hashtag, subIndex) => (
                <p className='hashtags' key={subIndex}>
                  {hashtag}
                </p>
              ))}
            </div>
            <div className='event-category'>
              <p className='info-category'>האשטגים נפוצים</p>
              <p className='explain-category'>בפוסטים קשורים</p>
            </div>
          </div>
        )}

        {/* Common Words */}
        <div className='section-info'>
          <div className='list-words'>
            {details.common_words.map((word, subIndex) => (
              <p className='words' key={subIndex}>
                {word}
                {subIndex < details.common_words.length - 1 && " \u00B7"}
              </p>
            ))}
          </div>
          <div className='event-category'>
            <p className='info-category'>מילים נפוצות</p>
            <p className='explain-category'>בפוסטים קשורים</p>
          </div>
        </div>

        {/* Emojis */}
        <div className='emoji-info'>
          <div
            style={{
              display: "flex",
              gap: "1vw",
              flexWrap: "wrap",
            }}>
            {Object.entries(details.common_emojis).map(
              ([emoji, percentage], subIndex) => (
                <div
                  style={{
                    display: "flex",
                    gap: "0.2vw",
                    alignItems: "flex-end",
                    marginBottom: "20px",
                  }}
                  key={subIndex}>
                  <p className='info-value-emoji'>{emoji}</p>
                  <p className='info-value-event'>{percentage}%</p>
                </div>
              )
            )}
          </div>
          <div className='event-category'>
            <p className='info-category'>אימוג׳ים נפוצים</p>
            <p className='explain-category'>בפוסטים קשורים</p>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "0",
          }}>
          <NavigationButton address={`/timeline`} value={"חזור לציר הזמן"} />
        </div>
      </div>
    </div>
  );
};

export default EventDrawer;
