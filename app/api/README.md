# Crush It Server

This is the backend of the Crush It application.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node.js package manager
- [MongoDB](https://www.mongodb.com/) - NoSQL database (if developing on the db locally)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:rubykap30/cs490-team10.git
   cd cs490-team10/
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**  
   Create a .env file in the `api` directory of the project and add the following:
   ```
   MONGODB_CONNECTION_STRING=mongodb://your-connection-string
   ```
   Replace `your-connection-string` with your actual MongoDB connection string.
4. **Build the Project:**
   ```
   yarn run build
   ```
5. **Run the Application:**

- For production:
  ```
  yarn run start
  ```
- For development:
  ```
  yarn run dev
  ```

5. **Access the Application:**

- Open your web browser and go to http://localhost:3000
