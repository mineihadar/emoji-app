import React from "react";
import './EventIndex.css'; // Import your CSS file
import image1 from './index_north.png'; // Import your image file

// Define your image data array
const imageData = [
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' },
    { src: image1, date: '07/10/2023-07/10/2023', name: 'מלחמה בצפון' }
    // Add more images as needed
];

const ImageGrid = () => {
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
                    <div key={index} className="image-item">
                        {image.empty ? (
                            <div className="image-placeholder"></div>
                        ) : (
                            <>
                                <div
                                    className="image"
                                    style={{ backgroundImage: `url(${image.src})` }}
                                ></div>
                                <div className="image-date">{image.date}</div>
                                <div className="image-name">{image.name}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
