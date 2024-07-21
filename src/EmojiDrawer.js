import React, { useEffect } from "react";
import "./EmojiDrawer.css"; // Add your styles here
import allEmojis from "./data/all_emojis.json";
import CurveGraph from "./CurveGraph";
import arrow from "./images/white_arrow.png";

const EmojiDrawer = ({ open, onClose, details }) => {
  const emojiPictures = {
    "⁉️": "./images/exclamation-question-mark.png",
    "‼️": "./images/double-exclamation-mark.png",
    "♥️": "./images/heart_suit.png",
  };

  useEffect(() => {
    if (open) {
      const drawerElement = document.querySelector(".emoji-drawer");
      drawerElement.classList.add("opening");
      setTimeout(() => {
        drawerElement.classList.remove("opening");
      }, 300); // The duration of your CSS transition
    }
  }, [open, details]);

  const getEmojiIndex = (emoji) => {
    const keys = Object.keys(allEmojis);
    return keys.indexOf(emoji) + 1;
  };

  const renderEmoji = (emoji) => {
    const imagePath = emojiPictures[emoji];
    if (imagePath) {
      return <img src={imagePath} alt='emoji' />;
    }
    return <p>{emoji}</p>;
  };

  return (
    <div className={`emoji-drawer ${open ? "open" : ""}`} onClick={onClose}>
      <div className='icon-frame'>
        <img
          style={{
            position: "absolute",
            width: "20px",
            left: "40px",
            top: "30px",
            transform: "rotate(180deg)",
          }}
          src={arrow}
        />
      </div>
      <div className='info-frame'>
        <div className='emoji-title'>
          <div className='emoji-container'>{renderEmoji(details.emoji)}</div>
          <div className='emoji-id'>
            <h5>{details.id.name}</h5>
            <p>קטגוריה: {details.id.category}</p>
            <p>שנת יצירה: {details.id.created_at}</p>
          </div>
        </div>
        {/* Popularity Index */}
        <div className='emoji-info'>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <p className='info-value-number'>{getEmojiIndex(details.emoji)}</p>
            <p className='info-value'>/ 682</p>
          </div>
          <div className='category'>
            <p className='info-category'>{details.details[0].category}</p>
            <p className='explain-category'>{details.details[0].text}</p>
          </div>
        </div>
        <div className='emoji-info'>
          <CurveGraph emoji={details.emoji} />
          <div className='category'>
            <p className='info-category'>גרף שימוש</p>
            <p className='explain-category'>לפי חודשים</p>
          </div>
        </div>

        {/* Sentiment */}
        <div className='emoji-info'>
          <div style={{ display: "flex", gap: "0.8vw" }}>
            {details.details[1].value.map((item, subIndex) => (
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
            <p className='info-category'>{details.details[1].category}</p>
            <p className='explain-category'>{details.details[1].text}</p>
          </div>
        </div>

        {/* Frequency */}
        <div className='emoji-info'>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <p className='info-value-number'>{details.details[2].value}</p>
            <p className='info-value'>{details.details[2].additionalText}</p>
          </div>
          <div className='category'>
            <p className='info-category'>{details.details[2].category}</p>
            <p className='explain-category'>{details.details[2].text}</p>
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
            {Object.entries(details.details[3].value).map(
              ([emoji, percentage], subIndex) => (
                <div
                  className='info-value-emoji'
                  style={{
                    display: "flex",
                    gap: "0.2vw",
                    alignItems: "flex-end",
                  }}
                  key={subIndex}>
                  <div className='info-value-emoji-container'>
                    {renderEmoji(emoji)}
                  </div>
                  <p className='info-value'>{percentage}%</p>
                </div>
              )
            )}
          </div>
          <div className='category'>
            <p className='info-category'>{details.details[3].category}</p>
            <p className='explain-category'>{details.details[3].text}</p>
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

export default EmojiDrawer;
