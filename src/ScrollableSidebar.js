import React from "react";
import "./ScrollableSidebar.css";

const ScrollableSidebar = ({ weeks, currentIndex, onScrollToWeek }) => {
  const getMonthNameInHebrew = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ];
    let month = monthNames[date.getMonth()];
    return month !== "ינואר" ? month : `${month} ${date.getFullYear()}`;
  };

  const isDifferentMonth = (currentWeek, previousWeek) => {
    const currentMonth = new Date(currentWeek.firstDay).getMonth();
    const previousMonth = previousWeek
      ? new Date(previousWeek.firstDay).getMonth()
      : null;
    return currentMonth !== previousMonth;
  };

  return (
    <div className='scrollable-sidebar'>
      {weeks.map((week, index) => (
        <div
          key={index}
          className={`week-line ${index === currentIndex ? "active" : ""}`}
          onClick={() => onScrollToWeek(index)}>
          <div className={`circle ${index === currentIndex ? "active" : ""}`} />
          {isDifferentMonth(week, weeks[index - 1]) && (
            <span className='month-label'>
              {getMonthNameInHebrew(week.firstDay)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollableSidebar;
