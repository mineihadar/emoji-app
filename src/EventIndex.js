import React, { useEffect, useState } from "react";
import "./EventIndex.css"; // Import your CSS file
import arrow from "./images/arrow.png";
import { useNavigate } from "react-router-dom";
import eventData from "./data/events.json"; // Import your JSON file

const ImageGrid = () => {
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Convert the new JSON structure to an array
    const formattedData = Object.keys(eventData).map((key) => ({
      key: key,
      text: eventData[key].text,
      img: eventData[key].img,
      smallImg: eventData[key].smallImg,
      firstDay: eventData[key].firstDay,
      lastDay: eventData[key].lastDay,
      dateText: eventData[key].dateText,
    }));

    // Set the formatted data to the state
    setImageData(formattedData);
  }, []);

  // Calculate the number of empty items needed
  const remainder = imageData.length % 4;
  const emptyItemsCount = remainder === 0 ? 0 : 4 - remainder;

  // Create an array of empty items
  const emptyItems = Array.from({ length: emptyItemsCount }).map(
    (_, index) => ({
      empty: true, // Flag to identify empty items
    })
  );

  // Concatenate empty items with actual image data
  const allImageData = [...imageData, ...emptyItems];

  return (
    <div className='grid-container'>
      <div className='image-grid'>
        {allImageData.map((event, index) => (
          <div
            key={index}
            className='image-item'
            onClick={() => !event.empty && navigate(`/events/${event.key}`)}>
            {event.empty ? (
              <div className='image-placeholder'></div>
            ) : (
              <>
                <div
                  className='image'
                  style={{
                    backgroundImage: `url(images/indexImages/${event.smallImg})`,
                  }}></div>
                <div className='image-date'>
                  {" "}
                  <p>{event.dateText}</p>
                </div>
                <div className='index-event-container'>
                  <p>{event.text}</p>
                  <img className='index-arrow' src={arrow} alt='arrow' />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
