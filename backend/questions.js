const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./model/questionModel");

dotenv.config(); // Load environment variables

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Sample Questions
const questions = [
    {
      questionText: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      questionText: "Which programming language is known as the backbone of web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: "JavaScript",
    },
    {
      questionText: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Marketing Language",
        "High Text Machine Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      questionText: "Which data structure uses LIFO (Last In First Out)?",
      options: ["Queue", "Stack", "Heap", "Linked List"],
      correctAnswer: "Stack",
    },
    {
      questionText: "What is React primarily used for?",
      options: ["Database Management", "Frontend Development", "Backend Development", "Cybersecurity"],
      correctAnswer: "Frontend Development",
    },
    {
      questionText: "Which company developed the React framework?",
      options: ["Google", "Facebook", "Microsoft", "Twitter"],
      correctAnswer: "Facebook",
    },
    {
      questionText: "What is the output of 2 + '2' in JavaScript?",
      options: ["4", "'22'", "Error", "undefined"],
      correctAnswer: "'22'",
    },
    {
      questionText: "Which of these is NOT a JavaScript framework?",
      options: ["Angular", "Vue", "Django", "React"],
      correctAnswer: "Django",
    },
    {
      questionText: "Which HTTP method is used to update existing data?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctAnswer: "PUT",
    },
    {
      questionText: "What is the default state management tool for React?",
      options: ["Redux", "Context API", "MobX", "Vuex"],
      correctAnswer: "Context API",
    },
    {
      questionText: "Which JavaScript function is used to delay execution of code?",
      options: ["setTimeout", "setInterval", "clearTimeout", "delay"],
      correctAnswer: "setTimeout",
    },
    {
      questionText: "Which SQL command is used to remove all records from a table without deleting the table structure?",
      options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
      correctAnswer: "TRUNCATE",
    },
    {
      questionText: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
      correctAnswer: "Float",
    },
    {
      questionText: "Which CSS property is used to make text bold?",
      options: ["font-style", "font-weight", "text-bold", "bold"],
      correctAnswer: "font-weight",
    },
    {
      questionText: "Which operator is used for strict equality comparison in JavaScript?",
      options: ["==", "===", "!=", "!=="],
      correctAnswer: "===",
    },
    {
      questionText: "Which protocol is used to secure HTTP connections?",
      options: ["FTP", "SSH", "HTTPS", "TCP"],
      correctAnswer: "HTTPS",
    },
    {
      questionText: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
      options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
      correctAnswer: "Bubble Sort",
    },
    {
      questionText: "Which of these is NOT a valid HTTP response status code?",
      options: ["200", "404", "999", "500"],
      correctAnswer: "999",
    },
    {
      questionText: "What is the default port for MongoDB?",
      options: ["27017", "3306", "5432", "8080"],
      correctAnswer: "27017",
    },
    {
      questionText: "Which function is used to parse JSON strings into JavaScript objects?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
      correctAnswer: "JSON.parse()",
    },
  ];
  

// Function to insert questions
const seedDB = async () => {
  await Question.deleteMany(); // Clear existing data
  await Question.insertMany(questions);
  console.log("Sample Questions Inserted Successfully!");
  mongoose.connection.close();
};

seedDB();
