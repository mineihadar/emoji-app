import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmojiImage.css";
import emojiRows from "./images/north_img.json";
import EventDrawer from "./EventDrawer";
import eventDetails from "./data/eventDetails.json";

const EmojiImage = () => {
  const { eventName } = useParams();
  const [loadedRows, setLoadedRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
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
  }, []);

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
        details={eventDetails["מחאות קפלן"]}
      />
    </div>
  );
};

export default EmojiImage;
