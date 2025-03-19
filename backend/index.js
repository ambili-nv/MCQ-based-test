const express = require('express');
const connectDatabase = require('./config/connection');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 



dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '/https://mcq-based-test.vercel.app',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// Connect to database
connectDatabase();

// Middleware for parsing JSON
app.use(express.json());


app.use('/api', userRoutes); 



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
