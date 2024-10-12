const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    personalInfo: {
      fullName: { type: String, default: "" },
      age: {
        type: Number,
        min: [5, "Age must be at least 5"],
        max: [100, "Age must be under 100"],
        default: null,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Undefined"],
        default: "Undefined",
      },
      contact: {
        email: {
          type: String,
          match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
        },
        phone: { type: String, default: null },
      },
    },

    academicInfo: {
      grade: { type: String, default: "" }, // e.g., "10th Grade"
      gpa: {
        type: Number,
        min: [0.0, "GPA cannot be below 0.0"],
        max: [10.0, "GPA cannot exceed 10.0"],
        default: null,
      },
      favoriteSubjects: [{ type: String, default: "" }],
      strengths: [{ type: String, default: "" }],
    },

    extracurricularActivities: [
      {
        name: { type: String, default: "" },
        description: { type: String, default: "" },
        duration: { type: String, default: "" }, // e.g., "2 years"
        position: { type: String, default: "" }, // e.g., "President", "Member", 'state level', "national level"
      },
    ],

    awards: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        date: { type: Date, default: null },
      },
    ],

    questionnaireResponses: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        response: Schema.Types.Mixed, // Flexible to accommodate various response types
      },
    ],

    careerSuggestions: [
      {
        career: { type: Schema.Types.ObjectId, ref: "CareerSuggestion" },
        suggestedOn: { type: Date, default: Date.now },
        relevanceScore: { type: Number }, // Optional: Useful for sorting suggestions
      },
    ],

    resources: [
      {
        resource: { type: Schema.Types.ObjectId, ref: "Resource" },
        accessedOn: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["Accessed", "Bookmarked"],
          default: "Accessed",
        },
      },
    ],

    progress: {
      questionnaireCompleted: { type: Boolean, default: false },
      careerSuggestionsGenerated: { type: Boolean, default: false },
      resourcesExplored: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to populate email from User
studentSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("user")) {
    try {
      const User = mongoose.model("User");
      const user = await User.findById(this.user);
      if (user && user.email) {
        this.personalInfo = this.personalInfo || {};
        this.personalInfo.contact = this.personalInfo.contact || {};
        this.personalInfo.contact.email = user.email;
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
