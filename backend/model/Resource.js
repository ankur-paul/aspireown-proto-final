// models/Resource.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  title: {
    type: String,
    required: [true, "Resource title is required"],
  },
  description: String,
  type: {
    type: String,
    enum: ["Course", "Book", "Video", "Website", "Webinar"],
    required: [true, "Resource type is required"],
  },
  link: {
    type: String,
    required: [true, "Resource link is required"],
  },
  relatedCareer: { type: Schema.Types.ObjectId, ref: "CareerSuggestion" },
});

module.exports = mongoose.model("Resource", resourceSchema);
