import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import tableData from "./weeks_with_emojis.csv";
import emojiCountsData from "./emoji_counts.json";

export default ({ weeks }) => {
  let table;
  let emojiCounts = {};

  // General settings
  let regularEmojiSpeed = 0.02;
  let bgColor = "#001139";
  let lightPurple = "#C7CBEE";

  // State to track canvas size
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update canvas size on window resize
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

  let emojiSpacing, emojiStartX, emojiStartY, emojiEnd;

  // Function to calculate dimensions based on canvas size
  const calculateDimensions = () => {
    emojiSpacing = canvasSize.width * 0.014; // Example calculation based on canvas size
    emojiStartX = canvasSize.width * 0.034;
    emojiStartY = canvasSize.height * 0.171;
    emojiEnd = canvasSize.width * 0.96;
  };

  calculateDimensions();

  let first = true;
  let allEmojis = [];

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
      this.cur_coords = new EmojiCoords(x, 0);
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
      p5.textSize(21);
      p5.fill(this.color);
      p5.text(this.value, this.cur_coords.x, this.cur_coords.y);
    }
  }

  const preload = (p5) => {
    table = p5.loadTable(tableData, "csv");
    // p5.loadJSON(emojiCountsData, (data) => {
    //   emojiCounts = data;
    // });
    // console.log(emojiCountsData);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasSize.width, canvasSize.height).parent(
      canvasParentRef
    );
    p5.background(bgColor);
    p5.textSize(21);

    // Initialize emojis from table data
    if (table.getRowCount() > 0) {
      for (let r = 0; r < table.getRowCount(); r++) {
        let row = table.getRow(r);
        for (let c = 0; c < table.getColumnCount(); c++) {
          let x = c * emojiSpacing + emojiStartX;
          let y = r * emojiSpacing + emojiStartY;
          let value = row.getString(c);
          let color = p5.color(255, 255, 255);
          allEmojis.push(
            new EmojiObject(value, x, y, regularEmojiSpeed, color)
          );
        }
      }
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

  function showWeekCursor(p5) {
    let cursorX = p5.mouseX;
    p5.stroke(lightPurple);
    // Time line
    p5.strokeWeight(5);
    p5.line(
      emojiStartX + 10,
      canvasSize.height * 0.95,
      emojiEnd - 10,
      canvasSize.height * 0.95
    );
    p5.fill(lightPurple);
    p5.strokeWeight(0);
    p5.textSize(14);
    p5.textFont("Narkis-ExtraLight");
    p5.textAlign("left");
    p5.text("מאי 2024", emojiStartX - 15, canvasSize.height * 0.97);
    p5.text("ינואר 2023", emojiEnd - 30, canvasSize.height * 0.97);
    if (cursorX >= emojiStartX && cursorX <= emojiEnd) {
      // Calculate the nearest x-coordinate that is a multiple of emojiSpacing
      let nearestX =
        Math.floor((cursorX - emojiStartX) / emojiSpacing) * emojiSpacing +
        emojiStartX;
      // Calculate the middle x-coordinate of the emoji range
      let lineX = nearestX + emojiSpacing / 2;
      // Determine which week corresponds to the current position
      let weekIndex = Math.floor((emojiEnd - lineX) / emojiSpacing);
      weekIndex = p5.constrain(weekIndex, 0, weeks.length - 1);
      let weekText = weeks[weekIndex].text.split("-");

      // Week line
      p5.strokeWeight(1);
      p5.line(lineX - 2, 0, lineX, p5.height - 50);
      // Circle timeline
      p5.fill(bgColor);
      p5.circle(lineX, canvasSize.height * 0.95, 16);

      // Week info
      p5.fill(lightPurple);
      p5.noStroke();
      p5.textSize(12.5);
      p5.textAlign("right");

      // Print the firstDay - lastDay of the week
      p5.text(`-${weekText[0]}`, lineX - 4, canvasSize.height * 0.114);
      p5.text(weekText[1], lineX - 7, canvasSize.height * 0.129);
      p5.textAlign("left");
    }
  }

  function showEmojiDetails(p5) {
    let cursorX = p5.mouseX;
    let cursorY = p5.mouseY;

    for (let i = 0; i < allEmojis.length; i++) {
      let curEmoji = allEmojis[i];
      if (curEmoji.value !== "") {
        if (
          Math.abs(curEmoji.cur_coords.x - cursorX) <= 10 &&
          Math.abs(curEmoji.cur_coords.y - cursorY) <= 10
        ) {
          let weekIndex = Math.floor(
            (emojiEnd - curEmoji.cur_coords.x) / emojiSpacing
          );
          weekIndex = p5.constrain(weekIndex, 0, weeks.length - 1);
          let weekText = weeks[weekIndex].text;
          let count = emojiCountsData[weekText][curEmoji.value] || 0;

          // Background purple rectangle
          p5.fill(lightPurple);
          p5.stroke(lightPurple);
          p5.rect(
            curEmoji.cur_coords.x - 60,
            curEmoji.cur_coords.y + 5,
            150,
            55
          );
          // Background emoji rectangle
          p5.fill(bgColor);
          p5.rect(
            curEmoji.cur_coords.x + 35,
            curEmoji.cur_coords.y + 5,
            55,
            55
          );
          // Emoji details
          p5.textSize(32);
          p5.noStroke();
          p5.text(
            curEmoji.value,
            curEmoji.cur_coords.x + 47,
            curEmoji.cur_coords.y + 45
          );
          p5.textSize(16);
          p5.textFont("Greta-Medium");
          p5.text(
            "פרצוף קורץ",
            curEmoji.cur_coords.x - 46,
            curEmoji.cur_coords.y + 26
          );
          p5.textFont("Narkis-ExtraLight");
          p5.textSize(12);
          p5.text(
            `${count} מופעים`,
            curEmoji.cur_coords.x - 27,
            curEmoji.cur_coords.y + 42
          );
        }
      }
    }
  }

  function turnOffEmojis(p5, emoji) {
    for (let i = 0; i < allEmojis.length; i++) {
      let curEmoji = allEmojis[i];
      if (curEmoji.value != emoji.value) {
        curEmoji.updateColor(p5, 25);
        emoji.drawThisEmoji(p5);
      }
    }
  }

  function turnOnEmojis(p5, emoji) {
    for (let i = 0; i < allEmojis.length; i++) {
      let curEmoji = allEmojis[i];
      curEmoji.updateColor(p5, 100);
      curEmoji.drawThisEmoji(p5);
    }
  }

  const mouseClicked = (p5) => {
    let cursorX = p5.mouseX;
    let cursorY = p5.mouseY;

    for (let i = 0; i < allEmojis.length; i++) {
      let curEmoji = allEmojis[i];
      if (curEmoji.value !== " ") {
        if (
          Math.abs(curEmoji.cur_coords.x - cursorX) <= 10 &&
          Math.abs(curEmoji.cur_coords.y - cursorY) <= 10
        ) {
          curEmoji.isClicked
            ? turnOnEmojis(p5, curEmoji)
            : turnOffEmojis(p5, curEmoji);
          curEmoji.updateIsClicked();
        }
      }
    }
  };

  function drawEmojis(p5) {
    for (let i = 0; i < allEmojis.length; i++) {
      let emoji = allEmojis[i];
      // Move the point towards point B
      let deltaX = emoji.next_coords.x - emoji.cur_coords.x;
      let deltaY = emoji.next_coords.y - emoji.cur_coords.y;
      emoji.cur_coords.x += deltaX * emoji.speed;
      emoji.cur_coords.y += deltaY * emoji.speed;
      emoji.drawThisEmoji(p5);
    }
  }

  const draw = (p5) => {
    p5.stroke(bgColor);
    if (first) {
      initEmojis(p5);
      first = false;
    }
    p5.background(bgColor);
    p5.color(lightPurple);
    drawEmojis(p5);
    showWeekCursor(p5);
    showEmojiDetails(p5);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mouseClicked={mouseClicked}
      />
    </div>
  );
};
