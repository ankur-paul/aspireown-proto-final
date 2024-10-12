// controllers/careerController.js

const Student = require("../model/Student");
const aiService = require("../services/aiService");

// Controller function to handle GET /api/careers
exports.getCareerSuggestions = async (req, res) => {
  try {
    console.log(req.user, "user in carrer controller");

    // 1. Extract Student Data
    // Assuming req.user contains authenticated user's data
    const studentId = req.user._id; // Modify based on your auth setup
    console.log(studentId);

    // const student = await Student.findById(studentId).lean();

    const student = await Student.findOne({ user: req.user._id })
      .populate("user", "-password -refreshToken")
      .populate("questionnaireResponses.question")
      .populate("careerSuggestions.career")
      .populate("resources.resource");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2. Format Data for AI Prompt
    const prompt = formatStudentDataForAI(student);

    // 3. Interact with AI API
    const careerSuggestions = await aiService.getCareerSuggestions(prompt);

    // 4. Respond to Client
    res.status(200).json({ careerSuggestions });
  } catch (error) {
    console.error("Error in getCareerSuggestions:", error);
    res.status(500).json({ message: "Failed to retrieve career suggestions" });
  }
};

// Helper function to format student data for AI prompt
const formatStudentDataForAI = (student) => {
  const { personalInfo, academicInfo, extracurricularActivities, awards } =
    student;

  const prompt = `
You are an AI career counselor. Based on the following student information, provide personalized career suggestions along with explanations and relevance score.  give response in pure json format with no extra text.

Academic Information:
- Grade: ${academicInfo.grade}
- GPA: ${academicInfo.gpa}
- Favorite Subjects: ${academicInfo.favoriteSubjects.join(", ")}
- Strengths: ${academicInfo.strengths.join(", ")}

Extracurricular Activities:
${extracurricularActivities
  .map(
    (activity) =>
      `- ${activity.name} (${activity.position}): ${activity.description}`
  )
  .join("\n")}

Awards:
${awards
  .map((award) => `- ${award.title} (${award.date}): ${award.description}`)
  .join("\n")}

Please suggest suitable career paths for this student and provide a brief explanation for each suggestion. give response in pure json format with no extra text.
    `;

  return prompt;
};

// Personal Information:
// - Name: ${personalInfo.fullName}
// - Age: ${personalInfo.age}
// - Gender: ${personalInfo.gender}
// - Email: ${personalInfo.contact.email}
// - Phone: ${personalInfo.contact.phone}
