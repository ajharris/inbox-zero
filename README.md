# Inbox Zero Gmail Inbox Manager

This project is a Gmail Inbox Manager that allows users to mark their entire Google inbox as read and scroll through messages at a user-defined speed to exempt specific files. It consists of a backend built with Flask and a frontend developed using React.

## Project Structure

```
gmail-inbox-manager
├── backend
│   ├── app.py                # Main entry point for the backend application
│   ├── inbox_zero.py         # Logic for authenticating with the Gmail API and marking emails as read
│   ├── requirements.txt       # Python dependencies for the backend
│   └── README.md              # Documentation for the backend
├── frontend
│   ├── public
│   │   └── index.html        # Main HTML file for the React application
│   ├── src
│   │   ├── components
│   │   │   ├── EmailList.js   # Component to display a list of emails
│   │   │   └── Controls.js     # Component for user controls
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # Entry point for the React application
│   │   └── styles
│   │       └── App.css        # CSS styles for the React application
│   ├── package.json           # Configuration file for npm
│   └── README.md              # Documentation for the frontend
└── README.md                  # Overview of the entire project
```

## Backend Setup

1. Navigate to the `backend` directory.
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```
   python app.py
   ```

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the required npm packages:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage

- Use the frontend interface to mark all unread emails as read.
- Adjust the scrolling speed to navigate through messages and exempt specific files as needed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.
