const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  answers: [
    { 
      questionId: String, 
      selectedOption: String, 
      correctAnswer: String 
    }
  ],
  customId: { type: String, required: true },
  feedback: { type: String, default: "" },  
  review: { type: String, default: "" },    
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestResult", testResultSchema);
