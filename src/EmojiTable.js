import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import tableData from "./weeks_with_emojis.csv";
import emojiCountsData from "./emoji_counts.json";
import "./EmojiTable.css";

const EmojiTable = ({ weeks }) => {
  let table;
  let emojiCounts = {};

  // General settings
  let regularEmojiSpeed = 0.02;
  let bgColor = "#151515";
  let lightPurple = "#C7CBEE";

  // State to track canvas size
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 5, // fix this to fit all screen sizes
  });

  let emojiSpacing, weekSpacing, emojiStartY, emojiEnd;
  let first = true;
  let allEmojis = [];

  // Function to calculate dimensions based on canvas size
  const calculateDimensions = () => {
    emojiSpacing = canvasSize.width * 0.02; // Example calculation based on canvas size
    weekSpacing = canvasSize.height * 0.012
    emojiStartY = window.innerHeight / 2.5;
    emojiEnd = canvasSize.height * 0.9;
  };

  calculateDimensions();

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  class EmojiCoords {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  // Emoji object class
  class EmojiObject {
    constructor(value, x, y, s, curColor) {
      this.value = value;
      this.cur_coords = new EmojiCoords(x, y);
      this.next_coords = new EmojiCoords(x, y);
      this.speed = s;
      this.color = curColor;
      this.isClicked = false;
    }

    updateCurCoords(newCoords) {
      this.next_coords = newCoords;
    }

    updateColor(p5, opacity) {
      this.color.setAlpha(opacity);
    }

    updateIsClicked() {
      this.isClicked = !this.isClicked;
    }

    drawThisEmoji(p5) {
      p5.noStroke();
      p5.textSize(24);
      p5.fill(this.color);
      p5.text(this.value, this.cur_coords.x, this.cur_coords.y);
    }
  }

  const preload = (p5) => {
    table = p5.loadTable(tableData, "csv", "header");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasSize.width, canvasSize.height).parent(
        canvasParentRef
    );
    p5.background(bgColor);
    p5.textSize(21);

    // Initialize emojis from table data if loaded
    if (table && table.getRowCount() > 0) {
      for (let c = 0; c < table.getColumnCount(); c++) {
        let emojisInColumn = [];
        for (let r = 0; r < table.getRowCount(); r++) {
          let value = table.getString(r, c);
          if (value) {
            emojisInColumn.push(value);
          }
        }

        let numEmojis = emojisInColumn.length;
        for (let r = 0; r < numEmojis; r++) {
          let value = emojisInColumn[r];
          let x = c * weekSpacing + emojiStartY;
          let y = (window.innerWidth / 3) + r * emojiSpacing; // Stack emojis horizontally
          let color = p5.color(255, 255, 255);
          allEmojis.push(
              new EmojiObject(value, y, x, regularEmojiSpeed, color)
          );
        }
      }
    }
  };

  const drawEmojis = (p5) => {
    for (let i = 0; i < allEmojis.length; i++) {
      let emoji = allEmojis[i];
      // Move the point towards point B
      let deltaX = emoji.next_coords.x - emoji.cur_coords.x;
      let deltaY = emoji.next_coords.y - emoji.cur_coords.y;
      emoji.cur_coords.x += deltaX * emoji.speed;
      emoji.cur_coords.y += deltaY * emoji.speed;
      emoji.drawThisEmoji(p5);
    }
  };

  function initEmojis(p5) {
    if (table.getRowCount() > 0) {
      for (let r = 0; r < table.getRowCount(); r++) {
        let row = table.getRow(r);
        for (let c = 0; c < table.getColumnCount(); c++) {
          let value = row.getString(c);
          p5.text(value, 0, 0);
        }
      }
    } else {
      p5.text("No data found", 50, 50);
    }
  }

  const draw = (p5) => {
    p5.background(bgColor);
    drawEmojis(p5);
    // showEmojiDetails(p5);
  };

  return (
      <div className="canvas-container">
        <Sketch
            setup={setup}
            draw={draw}
            preload={preload}
            windowResized={() => calculateDimensions()}
        />
      </div>
  );
};

export default EmojiTable;