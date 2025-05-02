import React from 'react';

const LoginButton = () => {
    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Expected JSON response but received something else.');
            }
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error during login:', error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <button onClick={handleLogin} className="control-button">
            Login to Gmail
        </button>
    );
};

export default LoginButton;