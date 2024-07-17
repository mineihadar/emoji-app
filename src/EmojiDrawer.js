import React from "react";
import "./EmojiDrawer.css"; // Add your styles here

const EmojiDrawer = ({ open, onClose, emojiDetails }) => {
  return (
    <div className={`drawer ${open ? "open" : ""}`}>
      <div className='info-frame'>
        <div className='icon-frame' onClick={onClose}>
          <span className='close-icon'>&rarr;</span>
        </div>
        <div className='emoji-title'>
          <h3>{emojiDetails.emoji}</h3>
          <div className='emoji-id'>
            <h5>{emojiDetails.id.name}</h5>
            <p>קטגוריה: {emojiDetails.id.category}</p>
            <p>שנת יצירה: {emojiDetails.id.created_at}</p>
          </div>
        </div>

        {/* Popularity Index */}
        <div className='emoji-info'>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <p className='info-value-number'>{emojiDetails.details[0].value}</p>
            <p className='info-value'>
              {emojiDetails.details[0].additionalText}
            </p>
          </div>
          <div className='category'>
            <p className='info-category'>{emojiDetails.details[0].category}</p>
            <p className='explain-category'>{emojiDetails.details[0].text}</p>
          </div>
        </div>

        {/* Sentiment */}
        <div className='emoji-info'>
          <div style={{ display: "flex", gap: "0.8vw" }}>
            {emojiDetails.details[1].value.map((item, subIndex) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.2vw",
                  alignItems: "flex-end",
                }}
                key={subIndex}>
                <p className='info-value-number'>{item[Object.keys(item)]}%</p>
                <p className='info-value'>{Object.keys(item)}</p>
              </div>
            ))}
          </div>
          <div className='category'>
            <p className='info-category'>{emojiDetails.details[1].category}</p>
            <p className='explain-category'>{emojiDetails.details[1].text}</p>
          </div>
        </div>

        {/* Frequency */}
        <div className='emoji-info'>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <p className='info-value-number'>{emojiDetails.details[2].value}</p>
            <p className='info-value'>
              {emojiDetails.details[2].additionalText}
            </p>
          </div>
          <div className='category'>
            <p className='info-category'>{emojiDetails.details[2].category}</p>
            <p className='explain-category'>{emojiDetails.details[2].text}</p>
          </div>
        </div>

        {/* Combinations */}
        <div className='emoji-info'>
          <div
            style={{
              display: "flex",
              gap: "0.4vw",
              flexWrap: "wrap",
            }}>
            {Object.entries(emojiDetails.details[3].value).map(
              ([emoji, percentage], subIndex) => (
                <div
                  style={{
                    display: "flex",
                    gap: "0.2vw",
                    alignItems: "flex-end",
                  }}
                  key={subIndex}>
                  <p className='info-value-emoji'>{emoji}</p>
                  <p className='info-value'>{percentage}%</p>
                </div>
              )
            )}
          </div>
          <div className='category'>
            <p className='info-category'>{emojiDetails.details[3].category}</p>
            <p className='explain-category'>{emojiDetails.details[3].text}</p>
          </div>
        </div>

        {/* Weekly Usage */}
        {/* <div className='emoji-info'>
          <div style={{ display: "flex", gap: "0.8vw" }}>
            {emojiDetails.details[4].value.map((item, subIndex) => (
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
            <p className='info-category'>{emojiDetails.details[4].category}</p>
            <p className='explain-category'>{emojiDetails.details[4].text}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EmojiDrawer;
