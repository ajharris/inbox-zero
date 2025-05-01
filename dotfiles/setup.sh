#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Setting up the backend..."
cd backend

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating a virtual environment..."
    python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Deactivate the virtual environment
deactivate
cd ..

echo "Setting up the frontend..."
cd frontend

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

echo "Setup complete!"