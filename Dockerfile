# Step 1: Official Node.js image
FROM node:22

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the app dependencies inside the container
RUN npm install

# Step 5: Copy the rest of application code into the container
COPY . .

# Step 6: Expose the port on which the app will run 
EXPOSE 5000

# Step 7: Start the app using npm 
CMD sleep 0.6 && npm start
