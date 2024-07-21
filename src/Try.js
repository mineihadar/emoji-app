import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import "./Try.css";

const emojis = [
  "😊",
  "🌟",
  "🍕",
  "🐱",
  "🎉",
  "🌈",
  "🚀",
  "💡",
  "🌸",
  "🎨",
  "🏀",
  "🐶",
  "🌍",
  "💻",
  "🎵",
  "📚",
  "🍫",
  "✨",
  "🚴",
  "🎁",
  "🎬",
  "🍔",
  "🏖",
  "🌷",
];

const Try = () => {
  const sketchRef = useRef();
  const emojiRef = useRef(emojis[0]);
  const drawnEmojis = useRef([]);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textSize(100);
        p.background(39, 39, 39); // Set the background color once
      };

      p.draw = () => {
        p.background(39, 39, 39); // Clear the background each frame
        const now = p.millis();

        // Remove emojis older than 10 seconds
        drawnEmojis.current = drawnEmojis.current.filter(
          (emoji) => now - emoji.timestamp < 500
        );

        // Draw all the emojis
        drawnEmojis.current.forEach((emoji) => {
          p.fill(255); // Set the fill color to white
          p.text(emoji.char, emoji.x, emoji.y);
        });
      };

      p.mouseMoved = () => {
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
        p.background(39, 39, 39); // Reset background after resizing
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = emojis.indexOf(emojiRef.current);
      const nextIndex = (currentIndex + 1) % emojis.length;
      emojiRef.current = emojis[nextIndex];
    }, 2000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <div ref={sketchRef} className='emoji-drawing-container'></div>;
};

export default Try;
