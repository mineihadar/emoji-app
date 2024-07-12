import React, { useState, useRef, useEffect } from "react";
import EmojiGrid from "./EmojiGrid";
import EmojiDrawer from "./EmojiDrawer";
import ScrollableSidebar from "./ScrollableSidebar";
import emojiData from "./weekly_emojis.json";
import "./App.css";
import logo from "./images/emoji_logo.gif";
import weeks from "./weeks.json";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmojiDetails, setSelectedEmojiDetails] = useState(null);
  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);
  const gridRef = useRef(null);
  const isScrolling = useRef(false);

  const handleClickEmoji = () => {
    !drawerOpen ? handleOpenDrawer() : handleCloseDrawer();
  };

  const handleOpenDrawer = () => {
    const emojiDetails = {
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
    };

    setSelectedEmojiDetails(emojiDetails);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleScrollToWeek = (index) => {
    const columns = document.querySelectorAll(".week-column");
    if (columns[index]) {
      isScrolling.current = true; // Prevent manual scroll handler from interfering
      columns[index].scrollIntoView({ behavior: "smooth", block: "center" });
      setVisibleColumnIndex(index);
      setTimeout(() => {
        isScrolling.current = false;
      }, 500); // Give some time for the scroll to complete
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return; // Skip if scroll is programmatic

      const columns = document.querySelectorAll(".week-column");
      let closestIndex = 0;
      let closestDistance = Infinity;

      columns.forEach((column, index) => {
        const rect = column.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 2);

        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      setVisibleColumnIndex(closestIndex);
    };

    const container = gridRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='App'>
      <div className='header'>
        <img src={logo} alt='Logo' />
        <div className='menu-options'>
          <p>ציר זמן</p>
          <p>אירועים</p>
          <p>אימוג׳ים</p>
          <p>על הפרויקט</p>
        </div>
      </div>
      <ScrollableSidebar
        weeks={weeks}
        currentIndex={visibleColumnIndex}
        onScrollToWeek={handleScrollToWeek}
      />
      <EmojiGrid
        weeks={weeks}
        onClickEmoji={handleClickEmoji}
        visibleColumnIndex={visibleColumnIndex}
        setVisibleColumnIndex={setVisibleColumnIndex}
        ref={gridRef}
      />
      {selectedEmojiDetails && (
        <EmojiDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          emojiDetails={selectedEmojiDetails}
        />
      )}
    </div>
  );
}

export default App;
