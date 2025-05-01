import React, { useState, useEffect } from 'react';
import EmailList from './components/EmailList';
import Controls from './components/Controls';

function App() {
    const [emails, setEmails] = useState([]);
    const [scrollSpeed, setScrollSpeed] = useState(1000); // default speed in milliseconds

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch('/api/emails'); // Adjust the endpoint as needed
            const data = await response.json();
            setEmails(data);
        };

        fetchEmails();
    }, []);

    return (
        <div className="App">
            <h1>Gmail Inbox Manager</h1>
            <Controls setScrollSpeed={setScrollSpeed} />
            <EmailList emails={emails} scrollSpeed={scrollSpeed} />
        </div>
    );
}

export default App;