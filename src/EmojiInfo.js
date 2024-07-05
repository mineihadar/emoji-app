import React, { useState, useEffect } from "react";
import "./EmojiInfo.css";
import xIcon from "./images/x_icon.svg";

const closeModal = () => {};

const EmojiInfo = ({ emojiDetails }) => {
  return (
    <div className='info-frame'>
      <div className='icon-frame' onClick={closeModal}>
        <img src={xIcon}></img>
      </div>
      <div className='emoji-title'>
        <h3>{emojiDetails.emoji}</h3>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.name.text}</p>
        <p className='info-value'>{emojiDetails.name.value}</p>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.year.text}</p>
        <p className='info-value'>{emojiDetails.year.value}</p>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.category.text}</p>
        <p className='info-value'>{emojiDetails.category.value}</p>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.colors.text}</p>
        {emojiDetails.colors.value.map((color) => (
          <p className='info-value'>{color}</p>
        ))}
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.twinEmojis.text}</p>
        <div style={{ display: "flex", gap: "0.8vw" }}>
          {emojiDetails.twinEmojis.value.map((emoji) => (
            <p className='info-value'>{emoji}</p>
          ))}
        </div>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.sentiment.text}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2vw" }}>
          {emojiDetails.sentiment.value.map((sentiment) => (
            <div
              style={{
                display: "flex",
                gap: "0.8vw",
              }}>
              <p className='info-value'>{Object.keys(sentiment)}</p>
              <p className='info-value'>{sentiment[Object.keys(sentiment)]}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.popular.text}</p>
        <p className='info-value'>מספר {emojiDetails.popular.value} מתוך 233</p>
      </div>
      <div className='emoji-info'>
        <p className='info-category'>{emojiDetails.occurences.text}</p>
        <p className='info-value'>{emojiDetails.occurences.value} הופעות</p>
      </div>
    </div>
  );
};

export default EmojiInfo;
