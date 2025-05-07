#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== India-Pakistan Conflict Map Startup Script ===${NC}"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}MongoDB is not installed. Please install MongoDB first.${NC}"
    echo -e "Visit https://www.mongodb.com/docs/manual/installation/ for installation instructions."
    exit 1
fi

# Create data directory for MongoDB if it doesn't exist
mkdir -p ./data/db

# Check if MongoDB is already running
if pgrep mongod > /dev/null; then
    echo -e "${YELLOW}MongoDB is already running.${NC}"
else
    # Start MongoDB in background
    echo -e "${YELLOW}Starting MongoDB server...${NC}"
    mongod --dbpath ./data/db --fork --logpath ./data/db/mongodb.log

    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to start MongoDB. Please check the logs at ./data/db/mongodb.log${NC}"
    else
        echo -e "${GREEN}MongoDB started successfully!${NC}"
    fi
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend && npm install @mui/x-date-pickers && npm install && cd ..
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend && npm install && cd ..
echo -e "${YELLOW}Installing mongoose in database directory...${NC}"
cd database && npm init -y > /dev/null && npm install mongoose bcryptjs dotenv && cd ..

# Create .env file if it doesn't exist
if [ ! -f ./backend/.env ]; then
    echo -e "${YELLOW}Creating .env file for backend...${NC}"
    if [ -f ./backend/.env.example ]; then
        cp ./backend/.env.example ./backend/.env
        # Change the port in the .env file to avoid conflicts
        sed -i '' 's/PORT=5000/PORT=5001/g' ./backend/.env
        echo -e "${GREEN}.env file created with port 5001 to avoid conflicts.${NC}"
    else
        echo -e "PORT=5001\nMONGODB_URI=mongodb://localhost:27017/india-pakistan-conflict\nJWT_SECRET=your_jwt_secret_key_here" > ./backend/.env
        echo -e "${GREEN}.env file created with default configuration.${NC}"
    fi
fi

# Update proxy in frontend package.json to match the new backend port
echo -e "${YELLOW}Updating frontend proxy to use port 5001...${NC}"
sed -i '' 's/"proxy": "http:\/\/localhost:5000"/"proxy": "http:\/\/localhost:5001"/g' ./frontend/package.json

# Initialize the database with sample data
echo -e "${YELLOW}Initializing database with sample data...${NC}"
cd database && node init.js && cd ..

# Start the application
echo -e "${YELLOW}Starting the application...${NC}"
npm start

# Trap SIGINT to handle Ctrl+C gracefully
trap ctrl_c INT

function ctrl_c() {
    echo -e "${YELLOW}Stopping application...${NC}"
    # Add MongoDB shutdown command
    mongod --dbpath ./data/db --shutdown
    echo -e "${GREEN}MongoDB server stopped.${NC}"
    exit 0
}

# Keep script running to maintain the trap
while true; do sleep 1; done
