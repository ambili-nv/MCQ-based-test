MERN Authentication & MCQ-based Test System
This is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to provide user authentication and an MCQ-based test system with feedback submission.

Features:
User Authentication: Secure user registration and login with mobile number and password.
Token-based Authentication: The application uses JWT (JSON Web Token) for user authentication.
MCQ Test: After login, users can take a 10-question multiple-choice test. Each correct answer earns them 5 marks, and the final score is calculated upon test completion.
Feedback System: After completing the test, users can view their score and provide feedback using emojis.
Responsive UI: Built with React and styled using Tailwind CSS, ensuring a smooth and responsive user experience across all devices.
Database: MongoDB is used for storing user data, test results, and feedback.
Tech Stack:
Frontend: React.js, Vite, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, JWT, bcrypt.js, CORS, dotenv
Other Tools: GitHub for version control.
Installation:
Clone the repository: git clone https://github.com/ambili-nv/MCQ-based-test.git
Navigate to the project directory: cd MCQ-based-test
Install dependencies for both frontend and backend:
For backend: cd backend && npm install
For frontend: cd frontend && npm install
Set up environment variables (e.g., JWT_SECRET, MongoDB URL) in a .env file.
Usage:
Start the backend server: npm run dev (It will run on localhost:5000 by default or your custom port)
Start the frontend development server: npm run dev (It will run on localhost:5173 by default)
Once both servers are running, open http://localhost:5173 in your browser to access the application.
