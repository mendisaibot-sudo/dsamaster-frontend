#!/bin/bash

# Simple deployment script for DSA React site
echo "Deploying DSA React site..."

# Build the project (already done, but just in case)
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Create a simple server using Python for testing
    echo "Starting local server on port 8000..."
    echo "Site will be available at http://localhost:8000"
    echo "Press Ctrl+C to stop"
    
    # Serve the built files
    cd dist
    python3 -m http.server 8000
else
    echo "Build failed!"
    exit 1
fi