import React from "react";
import "./About.css"

const About = () => {
  return (
      <div className="about-container">
        <h1 className="about-title">על הפרויקט</h1>

        <div className="about-section">
          <h2 className="section-title">מוטיבציה</h2>
          <p className="section-paragraph">
            אימוג׳ים מהווים חלק ניכר מהתקשורת שלנו, הם עוזרים לבטא רגשות ותחושות ומוסיפים מימד נוסף למילים הכתובות. ישראמוג׳י הוא פרויקט שבא לבחון את התופעה הזו ברשת החברתית טוויטר ('X') באמצעות ניתוח פוסטים שעלו בעת האחרונה בישראל. הפרויקט בוחן מגמות ומאפשר העמקה באירועים מרכזיים שהתרחשו בעת הזו, בניסיון להבין כיצד האימוג׳ים מבטאים ויזואלית את הלכי הרוח של התקופה.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">מקור הדאטה</h2>
          <p className="section-paragraph">
            פרויקט ישראמוג’י מבוסס על תוכן שנאסף מתוך עשרות אלפי פוסטים שהועלו בישראל ברשת החברתית טוויטר ('X') בשנים 2023-2024. מתוך התוכן, חולצו נתונים בנוגע לשימוש באימוג’ים בישראל.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">יוצרות הפרויקט</h2>
          <p className="section-paragraph">
            הדר מיניי ודניאלה פרידמן, סטודנטיות בתוכנית המשולבת למדעי המחשב ותקשורת חזותית של האוניברסיטה העברית והאקדמיה בצלאל. הפרויקט נעשה בהנחיית רותם פיש, כפרויקט גמר במחלקה לתקשורת חזותית בבצלאל.
          </p>
        </div>
      </div>
  );
};

export default About;

