# Use the official Node.js image from Docker Hub with the desired version.
FROM node:18.17.0

RUN mkdir /react-app

# Setting up the work directory
WORKDIR /react-app

# Copying all the files in our project
COPY . .

RUN npm install

# Starting our application
CMD ["npm","run","start"]

# Expose the port your application will run on.
EXPOSE 3000