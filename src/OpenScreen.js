import React, { useEffect, useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap@3.11.4";
import SplitType from "https://cdn.skypack.dev/split-type@0.3.3";
import "./OpenScreen.css";

const OpenScreen = () => {
  const textRef = useRef(null);

  // useEffect(() => {
  //   const ourText = new SplitType(textRef.current, { types: "chars" });
  //   const chars = ourText.chars;

  //   gsap.fromTo(
  //     chars,
  //     {
  //       y: "100vh", // Start from the bottom of the viewport
  //       opacity: 0,
  //     },
  //     {
  //       y: 0, // Animate to its final position
  //       opacity: 1,
  //       stagger: 0.09,
  //       duration: 3,
  //       ease: "power4.out",
  //       onComplete: () => {
  //         gsap.set(textRef.current, { y: 0 }); // Ensure it stays in place
  //       },
  //     }
  //   );
  // }, []);

  return (
    <div className='open-container'>
      {/* <div className='text-container'>
        <div className='about-text'>
          <p>
            ינואר 2023 - מאי 2024. <br />
            טרנדים ומגמות באימוג׳ים. <br />
            לפי פוסטים מ-X (טוויטר). <br />
            נאסף באמצעות Data Scraping.
          </p>
        </div>
      </div>
      <p ref={textRef} className='our-text'>
        ישראמוג׳י
      </p> */}
    </div>
  );
};

export default OpenScreen;
