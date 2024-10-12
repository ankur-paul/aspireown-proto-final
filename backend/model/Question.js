const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required"],
  },
  questionType: {
    type: String,
    enum: ["text", "rating", "multiple_choice", "boolean"],
    required: [true, "Question type is required"],
  },
  options: [
    {
      type: String,
    },
  ], // Relevant for multiple-choice questions
});

module.exports = mongoose.model("Question", questionSchema);
