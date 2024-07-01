// CodedText.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './logo.css';

const CodedText = () => {
    const codedTextRef = useRef(null);

    useEffect(() => {
        const t = codedTextRef.current;
        const arr1 = t.innerHTML.split('');
        const arr2 = [];
        arr1.forEach((char, i) => arr2[i] = randChar()); // fill arr2 with random characters

        const handlePointerOver = () => {
            const tl = gsap.timeline();
            let step = 0;
            tl.fromTo(t, {
                innerHTML: arr2.join(''),
                color: '#fff',
            }, {
                duration: arr1.length / 5, // duration based on text length
                ease: 'power4.in',
                delay: 0.1,
                color: '#fff',
                onUpdate: () => {
                    const p = Math.floor(tl.progress() * (arr1.length)); // whole number from 0 - text length
                    if (step !== p) { // throttle the change of random characters
                        step = p;
                        arr1.forEach((char, i) => arr2[i] = randChar());
                        let pt1 = arr1.join('').substring(p, 0),
                            pt2 = arr2.join('').substring(arr2.length - p, 0);
                        if (t.classList.contains('fromRight')) {
                            pt1 = arr2.join('').substring(arr2.length - p, 0);
                            pt2 = arr1.join('').substring(arr1.length - p);
                        }
                        t.innerHTML = pt2 + pt1; // update text
                    }
                }
            });
        };

        t.addEventListener('pointerover', handlePointerOver);

        return () => {
            t.removeEventListener('pointerover', handlePointerOver);
        };
    }, []);

    function randChar() {
        let validChars = "🏀😂👏🍉🩵🦄❤️🎗️🔥🥀🌻💪😭";
        let c = validChars[Math.floor(Math.random() * validChars.length)];
        return c;
    }

    return (
        <div className="codedText" ref={codedTextRef}>
            ישראמוג'י
        </div>
    );
};

export default CodedText;
