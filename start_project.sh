#!/bin/bash

# Set Node.js options to fix OpenSSL compatibility issue
export NODE_OPTIONS=--openssl-legacy-provider

# Start the backend server
(cd backend && python app.py) &

# Start the frontend server
(cd frontend && npm install && npm start) &

# Wait for both processes to finish
wait