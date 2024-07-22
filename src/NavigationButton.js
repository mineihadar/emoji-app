import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationButton.css"; // Make sure the CSS file is imported
import arrow from "./images/arrow.png";

function NavigationButton({ address, value, isBackground = false, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the additional onClick function
    }
    navigate(address);
  };

  return (
    <div className='button-container' onClick={handleClick}>
      <p>{value}</p>
      <img className='arrow' src={arrow} alt='arrow' />
    </div>
  );
}

export default NavigationButton;
