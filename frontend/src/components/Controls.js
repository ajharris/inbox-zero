import React, { useState } from 'react';

const Controls = ({ onMarkAsRead, onScrollSpeedChange }) => {
    const [scrollSpeed, setScrollSpeed] = useState(1000); // Default speed in milliseconds

    const handleSpeedChange = (event) => {
        const speed = event.target.value;
        setScrollSpeed(speed);
        onScrollSpeedChange(speed);
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
                    min="100"
                />
            </label>
        </div>
    );
};

export default Controls;