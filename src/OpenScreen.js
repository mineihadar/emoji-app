import React, { useRef, useEffect, useMemo } from "react";
import "./OpenScreen.css"; // Make sure the CSS file is imported
import { gsap } from "gsap";
import ScrollMagic from "scrollmagic"; // Ensure this is the correct import

function OpenScreen() {
  const ref = useRef(null);
  const textRefs = useRef([]); // References for the text lines

  const textLines = [
    "כאן תוכלו ללמוד על טרנדים ומגמות באימוג׳ים מינואר 2023 ועד מאי 2024",
    "מישראל התוכן מבוסס על פוסטים מטוויטר שנאספו באמצעות Data Scraping",
    "ובאופן ידני בחרו שנה וחודש או התחילו לגלול כדי לחקור",
  ];

  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 0; i < 80; i++) {
      const img = new Image();
      img.src = `./images/LogoFrames/emoji_logo_frames${i}.png`;
      img.onload = () => console.log(`Image ${i} loaded`);
      img.onerror = () => console.error(`Failed to load image ${i}`);
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    const render = (index) => {
      if (ctx && images[index]?.complete && images[index]?.naturalWidth !== 0) {
        ctx.clearRect(0, 0, ref.current.width, ref.current.height); // Clear the canvas before drawing the new frame
        ctx.drawImage(images[index], 0, 0);
      } else {
        console.error(`Image at index ${index} is not loaded or broken`);
      }
    };

    // GSAP and ScrollMagic
    const controller = new ScrollMagic.Controller();

    const scene = new ScrollMagic.Scene({
      triggerElement: "#trigger",
      duration: "300%", // Adjust duration for smoother animation
      triggerHook: 0.2, // Trigger the animation when the element is in the middle of the viewport
    })
      .setPin("#canvas-container") // Pin the canvas container
      .addTo(controller)
      .on("progress", (event) => {
        const frameIndex = Math.floor(event.progress * 79); // Calculate frame index based on scroll progress
        render(frameIndex);

        // Animate text lines appearance from below without fade-in
        const progress = event.progress;
        textRefs.current.forEach((line, index) => {
          const delay = index * 0.3; // Increase delay factor for more spacing
          const lineProgress = Math.min(
            1,
            Math.max(0, (progress - delay) / (1 - delay))
          );
          gsap.to(line, {
            y: (1 - lineProgress) * 50, // Move text up as scroll progresses
            opacity: lineProgress > 0 ? 1 : 0, // Make text visible when it starts moving
            duration: 0,
          });
        });
      });

    // Initial render
    render(0);
    textRefs.current.forEach((line) => gsap.set(line, { y: 50, opacity: 0 })); // Set initial position and opacity for the text lines

    // Cleanup on component unmount
    return () => {
      scene.destroy(true);
      controller.destroy(true);
    };
  }, [images]);

  return (
    <div style={{ height: "200vh" }}>
      <div style={{ height: "20vh" }}></div>
      <div id='trigger' style={{ height: "10px" }}></div>
      <div id='canvas-container' style={{ height: "1000px" }}>
        <canvas width={1000} height={200} ref={ref}></canvas>
        <div className='text-container' style={{ marginTop: "20px" }}>
          {textLines.map((line, index) => (
            <div
              key={index}
              className='text-mask' // Container to mask the text line
              style={{ overflow: "hidden", marginBottom: "0px" }}>
              <p
                className='about-text'
                ref={(el) => (textRefs.current[index] = el)}
                style={{ transform: "translateY(100%)" }} // Initially position below the mask
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpenScreen;
