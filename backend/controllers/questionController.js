const Question = require("../model/Question");

// Create a new question
exports.createQuestion = async (req, res, next) => {
  try {
    const { questionText, questionType, options } = req.body;

    const question = new Question({
      questionText,
      questionType,
      options: questionType === "multiple_choice" ? options : [],
    });

    await question.save();

    res
      .status(201)
      .json({ message: "Question created successfully", question });
  } catch (error) {
    next(error);
  }
};

// Get all questions
exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

// Update a question
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const question = await Question.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      res.status(404);
      throw new Error("Question not found");
    }

    res.json({ message: "Question updated successfully", question });
  } catch (error) {
    next(error);
  }
};

// Delete a question
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      res.status(404);
      throw new Error("Question not found");
    }

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    next(error);
  }
};
