const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
    validate: {
      validator: (arr) => arr.length >= 2, 
      message: "There must be at least two options.",
    },
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Question",questionSchema)
