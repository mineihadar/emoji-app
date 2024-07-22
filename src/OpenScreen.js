import React, { useEffect, useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap@3.11.4";
import SplitType from "https://cdn.skypack.dev/split-type@0.3.3";
import "./OpenScreen.css";
import Try from "./Try";
import NavigationButton from "./NavigationButton";

const OpenScreen = () => {
  const textRef = useRef(null);
  const aboutTextRef = useRef(null);
  const openContainerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate the main text
    const ourText = new SplitType(textRef.current, { types: "chars" });
    const chars = ourText.chars;

    gsap.fromTo(
      chars,
      {
        y: "100vh", // Start from the bottom of the viewport
        opacity: 1,
      },
      {
        y: 0, // Animate to its final position
        opacity: 1,
        stagger: 0.09,
        duration: 2,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(textRef.current, { y: 0 }); // Ensure it stays in place
          // Start about-text animation after the first animation completes
          animateAboutText();
        },
      }
    );

    const animateAboutText = () => {
      // Make about-text visible
      aboutTextRef.current.style.display = "block";

      const lines = aboutTextRef.current.querySelectorAll("span");
      gsap.fromTo(
        lines,
        {
          y: "100%", // Start from below the mask
        },
        {
          y: 0, // Animate to its final position
          duration: 2,
          ease: "power4.out",
          stagger: 0.2, // Stagger each line animation
          onComplete: () => {
            // Animate button appearance
            gsap.fromTo(
              buttonRef.current,
              {
                opacity: 0,
                y: 20, // Start below the final position
              },
              {
                opacity: 1,
                y: 0, // Animate to its final position
                duration: 1,
                ease: "power4.out",
              }
            );
          },
        }
      );
    };
  }, []);

  const handleButtonClick = () => {
    // Slide up and disappear when the button is clicked
    gsap.to(openContainerRef.current, {
      y: "-100vh",
      duration: 1,
      ease: "power4.in",
    });
  };

  return (
    <div ref={openContainerRef} className='open-container'>
      <Try style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }} />
      <div className='text-container'>
        <div
          className='about-text'
          ref={aboutTextRef}
          style={{ display: "none" }}>
          <p>
            <span>ינואר 2023 - מאי 2024</span> <br />
            <span>טרנדים ומגמות באימוג׳ים</span> <br />
            <span>מבוסס על רשת X (טוויטר) ישראל</span>
          </p>
        </div>
      </div>
      <p ref={textRef} className='our-text'>
        ישראמוג׳י
      </p>
      <div ref={buttonRef} className='button-wrapper'>
        <NavigationButton
          address='/timeline'
          value='התחלה'
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default OpenScreen;
