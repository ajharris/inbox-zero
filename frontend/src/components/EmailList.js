import React, { useEffect, useState } from 'react';

const EmailList = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/emails'); // Adjust the endpoint as necessary
                const data = await response.json();
                setEmails(data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Email List</h2>
            <ul>
                {emails.map(email => (
                    <li key={email.id}>
                        <h3>{email.subject}</h3>
                        <p>{email.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailList;