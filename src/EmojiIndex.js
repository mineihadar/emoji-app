import React, { useState, useEffect } from "react";
import "./EmojiIndex.css";
import data from "./data/all_emojis_translate.json"; // Import the JSON data
import EmojiDrawer from "./EmojiDrawer";
import emojiDetails from "./data/emojiDetails.json";

const EmojiIndex = () => {
  const [hoverStates, setHoverStates] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmojiDetails, setSelectedEmojiDetails] = useState(null);

  useEffect(() => {
    // Initialize hover state for each cell
    const initialHoverStates = new Array(data.length).fill(false);
    setHoverStates(initialHoverStates);

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.addEventListener("mouseenter", () => {
        setHoverStates((prevStates) => {
          const updatedStates = [...prevStates];
          updatedStates[index] = true;
          return updatedStates;
        });
      });

      cell.addEventListener("mouseleave", () => {
        setHoverStates((prevStates) => {
          const updatedStates = [...prevStates];
          updatedStates[index] = false;
          return updatedStates;
        });
      });
    });

    // Cleanup event listeners
    return () => {
      cells.forEach((cell) => {
        cell.removeEventListener("mouseenter", () => {});
        cell.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const handleEmojiClick = (emojiDetails) => {
    if (drawerOpen) {
      setDrawerOpen(false);
      setTimeout(() => {
        setSelectedEmojiDetails(emojiDetails);
        setDrawerOpen(true);
      }, 300); // Adjust this duration to match the drawer close animation duration
    } else {
      setSelectedEmojiDetails(emojiDetails);
      setDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const cells = data.map((item, index) => (
    <div className='cell' key={index} onClick={() => handleEmojiClick(item)}>
      <div className={`emoji-text-field ${hoverStates[index] ? "rotate" : ""}`}>
        {item.emoji}
      </div>
      <div className='name-text-field'>{item.name}</div>
    </div>
  ));

  return (
    <div className='grid-container'>
      <div className='grid'>{cells}</div>
      {selectedEmojiDetails && (
        <EmojiDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          details={emojiDetails}
        />
      )}
    </div>
  );
};

export default EmojiIndex;
