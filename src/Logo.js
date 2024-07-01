// CodedText.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./logo.css";

const CodedText = () => {
  const codedTextRef = useRef(null);

  useEffect(() => {
    const t = codedTextRef.current;
    const arr1 = Array.from(t.innerHTML); // Convert to array of characters
    const arr2 = arr1.map(() => randChar()); // fill arr2 with random characters

    const handlePointerOver = () => {
      const tl = gsap.timeline();
      let step = 0;
      tl.fromTo(
        t,
        {
          innerHTML: arr2.join(""),
          color: "#fff",
        },
        {
          duration: arr1.length / 10, // duration based on text length
          ease: "power4.in",
          delay: 0.1,
          color: "#fff",
          onUpdate: () => {
            const p = Math.floor(tl.progress() * arr1.length); // whole number from 0 - text length
            if (step !== p) {
              // throttle the change of random characters
              step = p;
              arr1.forEach((char, i) => (arr2[i] = randChar()));
              let pt1 = arr1.slice(0, p).join(""),
                pt2 = arr2.slice(p).join("");
              if (t.classList.contains("fromRight")) {
                pt1 = arr2.slice(0, p).join("");
                pt2 = arr1.slice(p).join("");
              }
              console.log(pt1);
              console.log(pt2);

              t.innerHTML = pt2 + pt1; // update text
            }
          },
        }
      );
    };

    t.addEventListener("pointerover", handlePointerOver);

    return () => {
      t.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  function randChar() {
    // Use an array to store valid characters to avoid invisible characters or combining sequences.
    let validChars = [
      "👏",
      "🍉",
      "🦄",
      "❤️",
      "🎗️",
      "🔥",
      "🥀",
      "🌻",
      "💪",
      "😭",
    ];
    let c = validChars[Math.floor(Math.random() * validChars.length)];
    return c;
  }

  console.log(randChar());

  return (
    <div className='codedText' ref={codedTextRef}>
      ישראמוג'י
    </div>
  );
};

export default CodedText;
