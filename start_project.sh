#!/bin/bash

# Apply dotfiles
bash dotfiles/setup.sh

# Install Python dependencies
pip install -r backend/requirements.txt

# Install React dependencies
(cd frontend && npm install)

# Run backend tests
pytest backend/tests/

# Set Node.js options to fix OpenSSL compatibility issue
export NODE_OPTIONS=--openssl-legacy-provider

# Start the backend server
(cd backend && python app.py) &

# Start the frontend server
(cd frontend && npm start) &

# Wait for both processes to finish
wait