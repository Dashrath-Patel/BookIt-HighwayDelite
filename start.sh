#!/bin/bash

echo "🚀 Starting BookIt Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install:all
fi

# Check if database is seeded
echo "🌱 Seeding database with sample data..."
cd backend
npm run seed
cd ..

# Start the application
echo "🎯 Starting frontend and backend..."
npm run dev