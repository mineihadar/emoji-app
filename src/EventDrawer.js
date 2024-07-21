import React from "react";
import "./EventDrawer.css"; // Add your styles here
import NavigationButton from "./NavigationButton";
import arrow from "./images/white_arrow.png";

const EventDrawer = ({ details, open, onClose, onOpen, previousAddress }) => {
  const emojiPictures = {
    "⁉️": "/images/exclamation-question-mark.png",
    "‼️": "/images/double-exclamation-mark.png",
    "♥️": "/images/heart_suit.png",
  };

  const renderEmoji = (emoji) => {
    const imagePath = emojiPictures[emoji];
    if (imagePath) {
      console.log(`Rendering image for ${emoji}: ${imagePath}`);
      return <img src={imagePath} alt={emoji} className='emoji-image' />;
    }
    console.log(`Rendering text for ${emoji}`);
    return <span className='emoji-text'>{emoji}</span>;
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to parent elements
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className={`event-drawer ${open ? "open" : ""}`} onClick={handleClick}>
      <div className='left-icon-frame'>
        <img
          className={`arrowDrawer ${open ? "opposite" : ""}`}
          alt='arrow'
          style={{ width: "20px" }}
          src={arrow}
        />
      </div>
      <div className='info-frame-event'>
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
                  marginBottom: "10px",
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
              flexWrap: "wrap",
            }}>
            {Object.entries(details.common_emojis).map(
              ([emoji, percentage], subIndex) => (
                <div
                  className='info-value-emoji-event'
                  style={{
                    display: "flex",
                    gap: "0.2vw",
                    alignItems: "flex-end",
                    marginBottom: "25px",
                  }}
                  key={subIndex}>
                  <div className='info-emoji-event-container'>
                    {renderEmoji(emoji)}
                  </div>
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
            bottom: "-20px",
            left: "0",
          }}>
          <NavigationButton
            address={previousAddress}
            value={
              previousAddress === "/timeline"
                ? "חזרה לציר הזמן"
                : "חזרה לאינדקס אירועים"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EventDrawer;
