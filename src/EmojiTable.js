import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import tableData from "./weeks_with_emojis.csv";
import emojiCountsData from "./emoji_counts.json";
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
    height: (window.innerHeight / 2 - EMOJI_SIZE) * 2 + NUM_WEEKS * EMOJI_SIZE * 2,
  });

  const [allEmojis, setAllEmojis] = useState([]);

  const canvasRef = useRef(); // Ref for the canvas
  const markerRef = useRef(); // Ref for the canvas marker

  let emojiSpacing, weekSpacing, emojiStartY, emojiEnd;

  // Function to calculate dimensions based on canvas size
  const calculateDimensions = () => {
    emojiSpacing = canvasSize.width * 0.023;
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
      let x = emoji.column * weekSpacing + emojiStartY;
      let y = window.innerWidth / 3 + emoji.row * emojiSpacing;
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
    }
  };

  const draw = (p5) => {
    p5.background(bgColor);
    drawEmojis(p5);
  };

  const windowResized = (p5) => {
    calculateDimensions();
    p5.resizeCanvas(window.innerWidth, window.innerHeight * 5);
    calculateNewEmojiPosition(p5);
  };

  useEffect(() => {
    const checkIntersection = () => {
      const viewportCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      if (markerRef.current) {
        const markerRect = markerRef.current.getBoundingClientRect();

        const isIntersecting = (
            markerRect.top <= viewportCenter.y &&
            markerRect.bottom >= viewportCenter.y &&
            markerRect.left <= viewportCenter.x &&
            markerRect.right >= viewportCenter.x
        );

        if (isIntersecting) {
          console.log("Marker intersecting with center");
          // Perform your action here
        }
      }
    };

    const intervalId = setInterval(checkIntersection, 100); // Check every 100ms

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div className="canvas-container" ref={canvasRef} style={{ position: 'relative' }}>
        <Sketch
            setup={setup}
            draw={draw}
            preload={preload}
            windowResized={windowResized}
        />
        {/* Marker element within the canvas */}
        <div
            ref={markerRef}
            style={{
              position: "absolute",
              top: "50%", // Adjust position as needed
              left: "0px", // Adjust position as needed
              width: "100vw",
              height: "42px",
              backgroundColor: "aqua",
            }}
        ></div>
      </div>
  );
};

export default EmojiTable;
