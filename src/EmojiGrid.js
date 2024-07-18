import React, { useEffect, useState, useRef, forwardRef } from "react";
import "./EmojiGrid.css";
import emojiData from "./data/weekly_emojis.json";
import trends from "./data/modified_trending_data_with_corrected_years.json";
import EmojiDrawer from "./EmojiDrawer";
import ScrollableSidebar from "./ScrollableSidebar";
import { findEmojiInData } from "./helpers/findEmojisData";
import externalLinkIcon from "./images/arrow.png";

const EmojiGrid = forwardRef(({ weeks }, ref) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmojiDetails, setSelectedEmojiDetails] = useState(null);
  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);
  const internalRef = useRef(null);
  const gridRef = ref || internalRef;
  const isScrolling = useRef(false);

  const handleClickEmoji = (emoji) => {
    let emojiDetails1 = findEmojiInData(emoji);
    if (drawerOpen) {
      handleCloseDrawer();
      setTimeout(() => {
        handleOpenDrawer(emojiDetails1);
      }, 300); // Adjust this delay if necessary
    } else {
      handleOpenDrawer(emojiDetails1);
    }
  };

  const handleOpenDrawer = (emojiDetails) => {
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

  const handleRowClick = (index) => {
    handleScrollToWeek(index);
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
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [gridRef, setVisibleColumnIndex]);

  useEffect(() => {
    const rootMargin = "-50% 0px -50% 0px"; // Symmetrical root margin
    const options = {
      root: null,
      rootMargin,
      threshold: [0, 0.5, 1], // More lenient threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleColumnIndex(parseInt(entry.target.dataset.index));
        }
      });
    }, options);

    const columns = document.querySelectorAll(".week-column");
    columns.forEach((column, index) => {
      column.dataset.index = index;
      observer.observe(column);
    });

    return () => {
      columns.forEach((column) => {
        observer.unobserve(column);
      });
    };
  }, [setVisibleColumnIndex]);

  const returnWeekTrend = (week) => {
    const weekData = trends.find((weekData) => weekData.week === week);
    if (weekData) {
      return weekData.trending_words.map((trend, index) => (
        <p key={index}>{`${trend}, `}</p>
      ));
    }
    return [];
  };

  const returnWeekEvents = (week) => {
    const weekData = trends.find((weekData) => weekData.week === week);
    if (weekData) {
      return weekData.events.map((event, index) => (
        <div className='event-container'>
          <p key={index}>{event}</p>
          <div style={{ height: "30px" }}>
            <img src={externalLinkIcon} />
          </div>
        </div>
      ));
    }
    return [];
  };

  const renderColumn = (weekData, week, index) => (
    <div
      className={`week-column ${index === visibleColumnIndex ? "visible" : ""}`}
      key={index}>
      <div
        className={`week-emoji-container ${
          index === visibleColumnIndex ? "highlighted" : ""
        }`}>
        <div className='emoji-row' onClick={() => handleRowClick(index)}>
          {weekData.map((emoji, idx) => (
            <div
              className={`emoji ${
                index === visibleColumnIndex ? "clickable" : ""
              }`}
              key={idx}
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click from triggering
                index === visibleColumnIndex && handleClickEmoji(emoji);
              }}>
              {emoji}
            </div>
          ))}
        </div>
        {week && (
          <div
            className={`week-info ${
              index === visibleColumnIndex ? "visible" : ""
            }`}>
            <div className='additional-text top'>
              <p className='year'>2023</p>
            </div>
            <p className='week'>{week.text}</p>
            <div className='additional-text bottom'>
              <div className='events-window'>
                <p className='title'>אירועים שקרו בשבוע</p>
                <div className='events'>{returnWeekEvents(week.text)}</div>
              </div>
              <div className='trends-window'>
                <p className='title'>מילים שחזרו בשבוע</p>
                <div className='trends'>{returnWeekTrend(week.text)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ScrollableSidebar
        weeks={weeks}
        currentIndex={visibleColumnIndex}
        onScrollToWeek={handleScrollToWeek}
      />
      <div className='scrollable-emojis' ref={gridRef}>
        <div className='emoji-grid-container'>
          {emojiData.map((weekData, index) =>
            renderColumn(weekData, weeks[index], index)
          )}
        </div>
      </div>
      {selectedEmojiDetails && (
        <EmojiDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          emojiDetails={selectedEmojiDetails}
        />
      )}
    </>
  );
});

export default EmojiGrid;
