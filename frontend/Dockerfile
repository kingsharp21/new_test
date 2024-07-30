# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the directory is writable
RUN chown -R node:node /app/frontend

# Install `serve` to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
