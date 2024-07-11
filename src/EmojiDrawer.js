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
            <h5>{emojiDetails.id.value}</h5>
            <p className='explain-category'>{emojiDetails.id.category}</p>
          </div>
        </div>
        {emojiDetails.details.map((detail, index) => (
          <div className='emoji-info' key={index}>
            {Array.isArray(detail.value) ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.8vw",
                }}>
                {detail.value.map((item, subIndex) =>
                  typeof item === "object" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2vw",
                        alignItems: "flex-end",
                      }}
                      key={subIndex}>
                      <p className='info-value-number'>
                        {item[Object.keys(item)]}%
                      </p>
                      <p className='info-value'>{Object.keys(item)}</p>
                    </div>
                  ) : (
                    <p className='info-value-emoji' key={subIndex}>
                      {item}
                    </p>
                  )
                )}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p className='info-value-number'>{detail.value}</p>
                <p className='info-value'>
                  {detail.additionalText ? detail.additionalText : ""}
                </p>
              </div>
            )}
            <div className='category'>
              <p className='info-category'>{detail.category}</p>
              <p className='explain-category'>{detail.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiDrawer;
