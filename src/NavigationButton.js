import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationButton.css"; // Make sure the CSS file is imported
import arrow from "./images/arrow.png";

function NavigationButton({ address, value, isBackground = false }) {
  const navigate = useNavigate();

  return (
    <div className='button-container' onClick={() => navigate(address)}>
      <p>{value}</p>
      <img className='arrow' src={arrow} alt='arrow' />
    </div>
  );
}

export default NavigationButton;
