import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import tableData from "./weeks_with_emojis.csv";
import "./EmojiTable.css";

const EmojiTable = ({ weeks }) => {
  let table;
  let emojiCounts = {};
  const EMOJI_SIZE = 28;
  const NUM_WEEKS = 65;

  // General settings
  let regularEmojiSpeed = 0.02;
  let bgColor = "#2D2D2D";
  let lightPurple = "#C7CBEE";

  // State to track canvas size
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height:
      (window.innerHeight / 2 - EMOJI_SIZE) * 2 + NUM_WEEKS * EMOJI_SIZE * 2, // fix this to fit all screen sizes
  });

  const [allEmojis, setAllEmojis] = useState([]);

  let emojiSpacing, weekSpacing, emojiStartY, emojiEnd;
  let first = true;

  // Function to calculate dimensions based on canvas size
  const calculateDimensions = () => {
    emojiSpacing = canvasSize.width * 0.023; // Example calculation based on canvas size
    weekSpacing = EMOJI_SIZE * 2;
    emojiStartY = window.innerHeight / 2 - EMOJI_SIZE * 3.4;
    emojiEnd = canvasSize.height * 0.9;
  };

  calculateDimensions();

  class EmojiCoords {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  // Emoji object class
  class EmojiObject {
    constructor(value, x, y, s, curColor, r, c) {
      this.value = value;
      this.cur_coords = new EmojiCoords(x, y);
      this.next_coords = new EmojiCoords(x, y);
      this.speed = s;
      this.color = curColor;
      this.isClicked = false;
      this.row = r;
      this.column = c;
    }

    updateCurCoords(newCoords) {
      this.cur_coords = newCoords;
    }

    updateColor(p5, opacity) {
      this.color.setAlpha(opacity);
    }

    updateIsClicked() {
      this.isClicked = !this.isClicked;
    }

    drawThisEmoji(p5) {
      p5.noStroke();
      p5.textSize(28);
      p5.fill(this.color);
      p5.text(this.value, this.cur_coords.x, this.cur_coords.y);
    }
  }

  const preload = (p5) => {
    table = p5.loadTable(tableData, "csv", "header");
  };

  const calculateEmojiPosition = (p5) => {
    const newEmojis = [];
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
          let y = window.innerWidth / 3 + r * emojiSpacing; // Stack emojis horizontally
          let color = p5.color(255, 255, 255);
          newEmojis.push(
            new EmojiObject(value, y, x, regularEmojiSpeed, color, r, c)
          );
        }
      }
    }
    setAllEmojis(newEmojis);
  };

  const calculateNewEmojiPosition = (p5) => {
    for (const emoji of allEmojis) {
      //console.log(`${emoji.r}`);
      let x = emoji.column * weekSpacing + emojiStartY;
      let y = window.innerWidth / 3 + emoji.row * emojiSpacing; // Stack emojis horizontally
      //let color = p5.color(255, 255, 255);
      console.log(emoji.c);

      emoji.updateCurCoords(new EmojiCoords(y, x));
    }
  };

  const setup = (p5, canvasParentRef) => {
    const canvas = p5
      .createCanvas(canvasSize.width, canvasSize.height)
      .parent(canvasParentRef);
    canvas.id("p5-canvas");
    p5.background(bgColor);
    p5.textSize(21);

    // Initialize emojis from table data if loaded
    calculateEmojiPosition(p5);
  };

  const drawEmojis = (p5) => {
    for (let i = 0; i < allEmojis.length; i++) {
      let emoji = allEmojis[i];
      emoji.drawThisEmoji(p5);

      // // Move the point towards point B
      // let deltaX = emoji.next_coords.x - emoji.cur_coords.x;
      // let deltaY = emoji.next_coords.y - emoji.cur_coords.y;
      // emoji.cur_coords.x += deltaX * emoji.speed;
      // emoji.cur_coords.y += deltaY * emoji.speed;
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

  const windowResized = (p5) => {
    calculateDimensions();
    p5.resizeCanvas(window.innerWidth, window.innerHeight * 5);
    calculateNewEmojiPosition(p5);
    // setCanvasSize({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });
    //calculateEmojiPosition();
  };

  return (
    <div className='canvas-container'>
      <Sketch
        setup={setup}
        draw={draw}
        preload={preload}
        windowResized={windowResized}
      />
    </div>
  );
};

export default EmojiTable;
