# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the build
RUN npm install -g serve

# Expose port 5000
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
