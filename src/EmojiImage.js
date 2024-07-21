import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmojiImage.css";
import EventDrawer from "./EventDrawer";
import events from "./data/events.json";
import emojiRegex from "emoji-regex";

const emojiPictures = {
  "⁉️": "/images/exclamation-question-mark.png",
  "‼️": "/images/double-exclamation-mark.png",
  "♥️": "/images/heart_suit.png",
};

const EmojiImage = () => {
  const { eventName } = useParams();
  const [emojiRows, setEmojiRows] = useState([]);
  const [loadedRows, setLoadedRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const loadEmojiRows = async () => {
      try {
        const emojiData = await import(`./jsons2/${events[eventName].img}`);
        setEmojiRows(emojiData.default);
      } catch (error) {
        console.error("Error loading emoji rows:", error);
      }
    };

    loadEmojiRows();
  }, [eventName]);

  useEffect(() => {
    if (emojiRows.length === 0) return;

    let currentRow = 0;
    const intervalId = setInterval(() => {
      setLoadedRows((prevRows) => {
        if (currentRow < emojiRows.length) {
          return [...prevRows, emojiRows[currentRow++]];
        } else {
          clearInterval(intervalId);
          setDrawerOpen(true); // Open drawer immediately after loading rows
          return prevRows;
        }
      });
    }, 50); // Load a new row every 50ms for a faster effect

    return () => clearInterval(intervalId);
  }, [emojiRows]);

  const renderEmoji = (emoji) => {
    const imagePath = emojiPictures[emoji];
    if (imagePath) {
      return <img style={{ width: "19px" }} src={imagePath} alt='emoji' />;
    }
    return emoji;
  };

  const splitEmojis = (str) => {
    const regex = emojiRegex();
    let match;
    const result = [];
    while ((match = regex.exec(str)) !== null) {
      result.push(match[0]);
    }
    return result;
  };

  return (
    <div id='emoji-container'>
      {loadedRows.map((row, index) => (
        <div key={index} className='emoji-image-row'>
          {splitEmojis(row).map((emoji, emojiIndex) => (
            <span key={emojiIndex}>{renderEmoji(emoji)}</span>
          ))}
        </div>
      ))}

      <EventDrawer
        details={events[eventName].details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default EmojiImage;
