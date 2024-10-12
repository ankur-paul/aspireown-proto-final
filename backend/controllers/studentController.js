const Student = require("../model/Student");
const CareerSuggestion = require("../model/CareerSuggestion");
const Resource = require("../model/Resource");
const Question = require("../model/Question");
const axios = require("axios");
const { request } = require("express");

// Get Student Profile
exports.getProfile = async (req, res, next) => {
  console.log(req.user, "req get profile");
  try {
    const student = await Student.findOne({ user: req.user._id })
      .populate("user", "-password -refreshToken")
      .populate("questionnaireResponses.question")
      .populate("careerSuggestions.career")
      .populate("resources.resource");

    console.log(student);

    if (!student) {
      res.status(404);
      throw new Error("Student profile not found");
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Update Student Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const student = await Student.findOneAndUpdate(
      { user: req.user._id },
      updates,
      { new: true, runValidators: true }
    )
      .populate("user", "-password -refreshToken")
      .populate("questionnaireResponses.question")
      .populate("careerSuggestions.career")
      .populate("resources.resource");

    if (!student) {
      res.status(404);
      throw new Error("Student profile not found");
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
};

// Submit Questionnaire Responses
exports.submitQuestionnaire = async (req, res, next) => {
  try {
    const responses = req.body.responses; // Expecting an array of { questionId, answer }

    const student = await Student.findOne({ user: req.user._id }).populate(
      "questionnaireResponses.question"
    );
    if (!student) {
      res.status(404);
      throw new Error("Student profile not found");
    }

    // Save responses
    responses.forEach((resp) => {
      student.questionnaireResponses.push({
        question: resp.questionId,
        response: resp.answer,
      });
    });

    // Update progress
    student.progress.questionnaireCompleted = true;
    student.progress.lastUpdated = Date.now();

    await student.save();

    // Generate career suggestions using AI
    const suggestions = await generateCareerSuggestions(responses);

    // Save career suggestions
    suggestions.forEach((suggestion) => {
      student.careerSuggestions.push({
        career: suggestion.careerId,
        relevanceScore: suggestion.relevanceScore,
      });
    });

    student.progress.careerSuggestionsGenerated = true;
    student.progress.lastUpdated = Date.now();

    await student.save();

    res.json({
      message: "Questionnaire submitted and career suggestions generated",
      suggestions,
    });
  } catch (error) {
    next(error);
  }
};

// Generate Career Suggestions using AI
const generateCareerSuggestions = async (responses) => {
  const prompt = constructPrompt(responses);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // Or the model you're using
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const suggestionsText = response.data.choices[0].text.trim();
    const parsedSuggestions = parseSuggestions(suggestionsText);
    return parsedSuggestions;
  } catch (error) {
    console.error("Error generating career suggestions:", error);
    throw new Error("Failed to generate career suggestions");
  }
};

// Construct AI Prompt from Responses
const constructPrompt = (responses) => {
  let prompt =
    "Based on the following student responses, suggest relevant career paths:\n\n";
  responses.forEach((resp) => {
    prompt += `Q: ${resp.questionText}\nA: ${resp.answer}\n\n`;
  });
  prompt += "Career Suggestions:\n1.";
  return prompt;
};

// Parse AI Suggestions into Structured Data
const parseSuggestions = (text) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const suggestions = lines.map((line) => {
    const parts = line.split(". ");
    const title = parts[1] || "Untitled Career";
    // For simplicity, assign a random relevance score. Implement actual logic as needed.
    const relevanceScore = Math.floor(Math.random() * 100) + 1;
    // Find or create a CareerSuggestion document
    // For demonstration, assume a function exists to find or create
    return {
      careerId: "60f5a3b8e1d3f916c8a1e8a2", // Placeholder: Replace with actual ID
      relevanceScore,
    };
  });

  return suggestions;
};

// Get Career Suggestions
exports.getCareerSuggestions = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate(
      "careerSuggestions.career"
    );
    if (!student) {
      res.status(404);
      throw new Error("Student profile not found");
    }

    res.json(student.careerSuggestions);
  } catch (error) {
    next(error);
  }
};

// Get Resources
exports.getResources = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate(
      "resources.resource"
    );
    if (!student) {
      res.status(404);
      throw new Error("Student profile not found");
    }

    res.json(student.resources);
  } catch (error) {
    next(error);
  }
};
