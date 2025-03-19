const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const Question = require('../model/questionModel')
const TestResult = require('../model/testModel')

// USER REGISTRATION 

const registerUser = async(req,res)=>{
    console.log(req.body);

    const {fullName,email,phoneNumber,status,password} = req.body

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            status,
            hashedpassword
        })
        console.log(newUser,"newuserrrr");
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
    
}


// USER LOGIN

const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;
    console.log(req.body);
    
  
    try {
      // Check if user exists
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.hashedpassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if(isMatch){
        console.log("fejwkfwjfnwj");
        
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, phoneNumber: user.phoneNumber },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  
    //   res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  // FETCH 10 RANDOM QUESTIONS
const getRandomQuestions = async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Get 10 random questions
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching quiz questions' });
    }
};


// GENERATE CUSTOME ID

const generateCustomId = () => {
    return Math.floor(Math.random() * 1000000); 
};


// SAVING TEST RESULTS

const saveTestResult = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { score, totalScore, answers } = req.body;
        console.log(answers,"llklklklk");
        

        const customId = generateCustomId();
        console.log(customId,"custommfwkejfjk");
        

        const newTestResult = new TestResult({
            userId,
            score,
            totalScore,
            answers,
            customId, 
            feedback: "", 
            review: "",   
        });

        await newTestResult.save();
        res.status(201).json({ message: "Test results saved successfully!"}); 
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//FETCHING THE TEST DATA

const getTestData = async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
    
        // Find the latest test result for the authenticated user
        const testResult = await TestResult.findOne({ userId }).sort({ createdAt: -1 }).lean();
    
        if (!testResult) {
          return res.status(404).json({ message: 'Test result not found' });
        }
    
      
        res.status(200).json({
            customId: testResult.customId,
          score: testResult.score,
        });
      } catch (error) {
        console.error('Error fetching test details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


// SUBMIT FEEDBACK

const submitFeedback = async (req, res) => {
    const { testId, feedback, review } = req.body;
    console.log(testId,"ttt");
    console.log(feedback,"fff");
    console.log(review,"rrrr");
    
    try {
      const testResult = await TestResult.findOne({ customId: testId });
  
      if (!testResult) {
        return res.status(404).json({ message: "Test result not found" });
      }
  
      // Update feedback and review
      testResult.feedback = feedback;
      testResult.review = review;
  
      await testResult.save();
      res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



module.exports = {
    registerUser,
    loginUser,
    getRandomQuestions,
    saveTestResult,
    getTestData,
    submitFeedback
}