import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmojiImage.css";
import EventDrawer from "./EventDrawer";
import events from "./data/events.json";

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
          setDrawerOpen(true);
          return prevRows;
        }
      });
    }, 50); // Load a new row every 50ms for a faster effect

    return () => clearInterval(intervalId);
  }, [emojiRows]);

  return (
    <div id='emoji-container'>
      {loadedRows.map((row, index) => (
        <div key={index} className='emoji-image-row'>
          {row}
        </div>
      ))}
      <EventDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        details={events[eventName].details}
      />
    </div>
  );
};

export default EmojiImage;
