import React, { useEffect, useState } from "react";
import './EventIndex.css'; // Import your CSS file
import arrow from "./images/arrow.png";
import { useNavigate } from "react-router-dom";
import eventData from "./data/event_index_data.json"; // Import your JSON file

const ImageGrid = () => {
    const [imageData, setImageData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Set the imported JSON data directly
        setImageData(eventData);
    }, []);

    // Calculate the number of empty items needed
    const remainder = imageData.length % 4;
    const emptyItemsCount = remainder === 0 ? 0 : 4 - remainder;

    // Create an array of empty items
    const emptyItems = Array.from({ length: emptyItemsCount }).map((_, index) => ({
        src: "", // Empty source
        date: "",
        name: "",
        empty: true // Flag to identify empty items
    }));

    // Concatenate empty items with actual image data
    const allImageData = [...imageData, ...emptyItems];

    return (
        <div className='grid-container'>
            <div className="image-grid">
                {allImageData.map((image, index) => (
                    <div key={index} className="image-item" onClick={() => navigate(`/events/${image.name}`)}>
                        {image.empty ? (
                            <div className="image-placeholder"></div>
                        ) : (
                            <>
                                <div
                                    className="image"
                                    style={{ backgroundImage: `url(${image.src})` }}
                                ></div>
                                <div className="image-date">{image.date}</div>
                                <div className='index-event-container'>
                                    <p>{image.name}</p>
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
