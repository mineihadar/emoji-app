import React, { useEffect, useRef } from "react";
import p5 from "p5";
import "./Try.css";

const emojis = [
  "😊",
  "🍕",
  "🌈",
  "🚀",
  "🌸",
  "✨",
  "🍔",
  "🌷",
  "😂",
  "😍",
  "🇮🇱",
  "🔯",
  "🔥",
  "🕯",
  "️🥙",
  "💔",
  "💙",
  "👑",
  "🦄",
  "🎗",
  "️❤",
  "️🇺🇸",
  "⚽",
  "🏓",
  "💛",
  "😭",
  "🖥",
  "️👏",
  "💪",
  "🏀",
  "🥀",
  "🍉",
  "🎉",
];

const Try = () => {
  const sketchRef = useRef();
  const emojiRef = useRef(emojis[0]);
  const drawnEmojis = useRef([]);
  const lastMousePosition = useRef({ x: null, y: null });

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textSize(100);
        p.background(45, 45, 45); // Set the background color once
      };

      p.draw = () => {
        p.background(45, 45, 45); // Clear the background each frame
        const now = p.millis();

        // Remove emojis older than 10 seconds
        drawnEmojis.current = drawnEmojis.current.filter(
          (emoji) => now - emoji.timestamp < 200
        );

        // Draw all the emojis
        drawnEmojis.current.forEach((emoji) => {
          p.fill(255); // Set the fill color to white
          p.text(emoji.char, emoji.x, emoji.y);
        });

        // Draw the current emoji at the last mouse position
        if (
          lastMousePosition.current.x !== null &&
          lastMousePosition.current.y !== null
        ) {
          p.fill(255);
          p.text(
            emojiRef.current,
            lastMousePosition.current.x,
            lastMousePosition.current.y
          );
        }
      };

      p.mouseMoved = () => {
        // Update the last mouse position
        lastMousePosition.current = { x: p.mouseX, y: p.mouseY };

        // Add the current emoji to the array
        drawnEmojis.current.push({
          char: emojiRef.current,
          x: p.mouseX,
          y: p.mouseY,
          timestamp: p.millis(),
        });

        // Keep only the latest 30 emojis
        if (drawnEmojis.current.length > 30) {
          drawnEmojis.current.shift();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(45, 45, 45); // Reset background after resizing
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // const nextIndex = (currentIndex + 1) % emojis.length;
      const nextIndex = Math.floor(Math.random() * emojis.length);
      emojiRef.current = emojis[nextIndex];
    }, 3000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return <div ref={sketchRef} className='emoji-drawing-container'></div>;
};

export default Try;
