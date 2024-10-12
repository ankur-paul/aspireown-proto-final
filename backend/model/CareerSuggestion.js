const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSuggestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Career title is required"],
  },
  description: String,
  requiredEducation: String,
  requiredSkills: [String],
  salaryRange: String, // e.g., 50,000 - 70,000 ruppees
  jobOutlook: String, // e.g., Growing at 5% annually
  relatedSubjects: [String], // e.g., ["Mathematics", "Computer Science"]
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ], // Related resources
});

module.exports = mongoose.model("CareerSuggestion", careerSuggestionSchema);
