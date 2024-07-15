import React, { useState, useEffect } from "react";
import "./EmojiImage.css";
import emojiRows from "./images/nasralla.json";
import EmojiDrawer from "./EmojiDrawer"; // Import EmojiDrawer component

const EmojiImage = () => {
  const [loadedRows, setLoadedRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmojiDetails, setSelectedEmojiDetails] = useState(null);

  useEffect(() => {
    let currentRow = 0;
    const intervalId = setInterval(() => {
      setLoadedRows((prevRows) => {
        if (currentRow < emojiRows.length) {
          return [...prevRows, emojiRows[currentRow++]];
        } else {
          clearInterval(intervalId);
          setSelectedEmojiDetails({
            emoji: "🇮🇱",
            id: {
              value: "דגל ישראל | דגלי מדינות | 2015",
              category: "שם האימוג׳י | קטגוריה | שנת יצירת האימוג׳י",
            },
            details: [
              {
                category: "מדד פופולריות",
                text: "מבין האימוג׳ים בהם משתמשים בישראל",
                value: "1",
                additionalText: "/230",
              },
              {
                category: "סנטימנט",
                text: "אחוזי הופעה בפוסטים לפי הקשר רגשי (חולץ על סמך מודל שפה)",
                value: [{ חיובי: 79 }, { ניטרלי: 20 }, { שלילי: 11 }],
              },
              {
                category: "שכיחות",
                text: "ממוצע הופעות בפוסט בודד (כמה פעמים מקלידים אותו בפוסט)",
                value: "1.83",
                additionalText: "מופעים/פוסט",
              },
              {
                category: "שילובים",
                text: "אימוג׳ים נפוצים בצירוף (נוטים להופיע יחד עם אימוג’י זה בפוסטים)",
                value: ["💙", "💪", "✊", "🙏", "❤️"],
              },
            ],
          });
          setDrawerOpen(true);
          return prevRows;
        }
      });
    }, 50); // Load a new row every 50ms for a faster effect

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id='emoji-container'>
      {loadedRows.map((row, index) => (
        <div key={index} className='emoji-row'>
          {row}
        </div>
      ))}
      {selectedEmojiDetails && (
        <EmojiDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          emojiDetails={selectedEmojiDetails}
          direction='left' // For the drawer opening from the left after image loading
        />
      )}
    </div>
  );
};

export default EmojiImage;
