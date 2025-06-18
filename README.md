Student Management
A full-stack web application for managing student information, built with the MERN Stack (MongoDB, Express.js, React, Node.js) and leveraging Vite for optimized React development.

Key Features
View Student List: Display all students in the system.
Add New Student: Add new student information to the database.
Edit Student Information: Update existing student details.
Delete Student: Remove students from the system.
Responsive Design: Optimized for various screen sizes.
Technologies Used
Frontend:
React.js: A JavaScript library for building user interfaces.
Vite: A fast build tool for React projects.
Axios: A promise-based HTTP client for making API requests.
React Router DOM: For client-side routing within the application.
Backend:
Node.js: A JavaScript runtime environment.
Express.js: A web application framework for Node.js to build APIs.
Mongoose: An ODM (Object Data Modeling) library for MongoDB.
Database:
MongoDB: A flexible and scalable NoSQL database.
Installation and Setup
Follow these steps to get your project up and running on your local machine.

Prerequisites
Ensure you have the following installed:

Node.js (version 14 or higher)
npm (comes with Node.js) or Yarn
MongoDB (ensure your MongoDB service is running)

Backend
Clone the repository:

Bash

git clone <YOUR_REPOSITORY_URL>
cd student-management # Or your project's main folder name
Navigate to the backend directory and install dependencies:

Bash

cd backend # Or your backend folder name
npm install
# or
yarn install
Create a .env file:
Create a .env file in the backend directory and add the following environment variables:

Đoạn mã

MONGO_URI=mongodb://localhost:27017/studentdb # Change studentdb if your DB name is different
PORT=5000 # Or your preferred port
Start the server:

Bash

npm start
# or
yarn start
The server will be running at http://localhost:5000 (or your configured port).

Frontend
Navigate to the frontend directory and install dependencies:

Bash

cd ../frontend # Or your frontend folder name
npm install
# or
yarn install
Start the React application:

Bash

npm run dev
# or
yarn dev
The application will be running at http://localhost:5173 (or the port assigned by Vite).

Project Structure
student-management/
├── backend/
│   ├── src/
│   │   ├── models/        # MongoDB Schemas
│   │   ├── controllers/   # Request handling logic
│   │   ├── routes/        # API endpoint definitions
│   │   └── server.js      # Express server initialization file
│   ├── .env.example
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API call functions (using Axios)
│   │   ├── App.jsx        # Root React component
│   │   └── main.jsx       # Application entry point
│   ├── vite.config.js
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
