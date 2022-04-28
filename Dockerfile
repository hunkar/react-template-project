# pull official base image
FROM node

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

ENV CI=true
RUN npm run test

# Build for production.
RUN npm run build --production

#Expose the app's port
EXPOSE 3001

# Install `serve` to run the application.
RUN npm install -g serve

# Run application
CMD serve -l 3001 -s build