// controllers/careerController.js

const Student = require("../model/Student");
const aiService = require("../services/aiService");

// Controller function to handle GET /api/careers
exports.getResources = async (req, res) => {
  try {
    console.log(req.user, "user in resourse controller");

    // 1. Extract Student Data
    // Assuming req.user contains authenticated user's data
    // const studentId = req.user._id; // Modify based on your auth setup
    // console.log(studentId);

    // const student = await Student.findById(studentId).lean();

    // const student = await Student.findOne({ user: req.user._id })
    //   .populate("user", "-password -refreshToken")
    //   .populate("questionnaireResponses.question")
    //   .populate("careerSuggestions.career")
    //   .populate("resources.resource");

    // if (!student) {
    //   return res.status(404).json({ message: "Student not found" });
    // }

    // 2. Format Data for AI Prompt
    const prompt = formatStudentDataForAI(req.body.careers);

    // 3. Interact with AI API
    const careerSuggestionsResouces = await aiService.getCareerSuggestions(
      prompt
    );

    // 4. Respond to Clientr
    res.status(200).json({ careerSuggestionsResouces });
  } catch (error) {
    console.error("Error in getResources:", error);
    res.status(500).json({ message: "Failed to retrieve career suggestions" });
  }
};

// Helper function to format student data for AI prompt
const formatStudentDataForAI = (student) => {
  const { personalInfo, academicInfo, extracurricularActivities, awards } =
    student;

  const prompt = `
For the given career options give me links to some best resourses available. give response strictly in json format, there should not be any extra text. For resources you can give youtube video links, endx courses, coursera courses, neptel courses etc. also tell the type of resource. for eg. coursera-course, youtube video, khan-academy course etc

career options for which resources needed = ${student}
    `;

  return prompt;
};

// Personal Information:
// - Name: ${personalInfo.fullName}
// - Age: ${personalInfo.age}
// - Gender: ${personalInfo.gender}
// - Email: ${personalInfo.contact.email}
// - Phone: ${personalInfo.contact.phone}
