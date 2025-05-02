import React, { useEffect, useState } from 'react';

const EmailList = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/emails');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Expected JSON response but received something else.');
                }
                const data = await response.json();
                setEmails(data);
            } catch (error) {
                console.error('Error fetching emails:', error);
                alert(`Failed to fetch emails: ${error.message}`);
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