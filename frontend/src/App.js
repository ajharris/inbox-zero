import React, { useState, useEffect } from 'react';
import EmailList from './components/EmailList';
import Controls from './components/Controls';
import LoginButton from './components/LoginButton';

function App() {
    const [emails, setEmails] = useState([]);
    const [scrollSpeed, setScrollSpeed] = useState(1000); // default speed in milliseconds

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/emails');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEmails(data);
            } catch (error) {
                console.error('Error fetching emails:', error);
                alert('Failed to fetch emails. Please check the backend server.');
            }
        };

        fetchEmails();
    }, []);

    return (
        <div className="App">
            <h1>Gmail Inbox Manager</h1>
            <LoginButton />
            <Controls onScrollSpeedChange={setScrollSpeed} />
            <EmailList emails={emails} scrollSpeed={scrollSpeed} />
        </div>
    );
}

export default App;