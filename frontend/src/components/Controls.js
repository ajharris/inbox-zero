import React, { useState } from 'react';

const Controls = ({ onMarkAsRead, onScrollSpeedChange }) => {
    const [scrollSpeed, setScrollSpeed] = useState(1000); // Default speed in milliseconds

    const handleSpeedChange = (event) => {
        const speed = event.target.value;
        setScrollSpeed(speed);
        onScrollSpeedChange(speed);
    };

    const handleWheelChange = (event) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 100 : -100; // Adjust speed in increments of 100ms
        const newSpeed = Math.max(100, scrollSpeed + delta); // Minimum speed is 100ms
        setScrollSpeed(newSpeed);
        onScrollSpeedChange(newSpeed);
    };

    const handleMarkAsRead = () => {
        onMarkAsRead();
    };

    return (
        <div className="controls">
            <button onClick={handleMarkAsRead}>Mark All as Read</button>
            <label>
                Scroll Speed (ms):
                <input
                    type="number"
                    value={scrollSpeed}
                    onChange={handleSpeedChange}
                    onWheel={handleWheelChange}
                    min="100"
                />
            </label>
        </div>
    );
};

export default Controls;