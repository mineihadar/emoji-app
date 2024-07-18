import React from "react";
import "./EventDrawer.css"; // Add your styles here

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

          <p>{details.id.about}</p>
        </div>

        {/* Common Words */}
        <div className='section-info'>
          <div className='list-words'>
            {details.common_words.map((word, subIndex) => (
              <p className='words' key={subIndex}>
                {word}
              </p>
            ))}
          </div>
          <div className='category'>
            <p className='info-category'>מילים נפוצות</p>
            <p className='explain-category'>בפוסטים קשורים</p>
          </div>
        </div>

        {/* Common Hashtags */}
        <div className='section-info'>
          <div className='list-words'>
            {details.common_hashtags.map((hashtag, subIndex) => (
              <p className='words' key={subIndex}>
                {hashtag}
              </p>
            ))}
          </div>
          <div className='category'>
            <p className='info-category'>האשטגים נפוצים</p>
            <p className='explain-category'>בפוסטים קשורים</p>
          </div>
        </div>

        {/* Emojis */}
        <div className='emoji-info'>
          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              flexWrap: "wrap",
            }}>
            {details.common_emojis.map((emoji, subIndex) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.2vw",
                  alignItems: "flex-end",
                }}
                key={subIndex}>
                <p className='info-value-emoji'>{emoji.emoji}</p>
                <p className='info-value'>{emoji.percentage}%</p>
              </div>
            ))}
          </div>
          <div className='category'>
            <p className='info-category'>אימוג׳ים נפוצים</p>
            <p className='explain-category'>בפוסטים קשורים</p>
          </div>
        </div>

        {/* Weekly Usage */}
        {/* <div className='emoji-info'>
          <div style={{ display: "flex", gap: "0.8vw" }}>
            {details.details[4].value.map((item, subIndex) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.2vw",
                  alignItems: "flex-end",
                }}
                key={subIndex}>
                <p className='info-value-number'>{item[Object.keys(item)]}</p>
                <p className='info-value'>{Object.keys(item)}</p>
              </div>
            ))}
          </div>
          <div className='category'>
            <p className='info-category'>{details.details[4].category}</p>
            <p className='explain-category'>{details.details[4].text}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EventDrawer;
