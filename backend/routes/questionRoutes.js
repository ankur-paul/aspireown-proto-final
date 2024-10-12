// routes/questionRoutes.js

const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authenticateJWT = require("../middleware/verifyJWT");
const authorizeRoles = require("../middleware/verifyRoles");

// Create a new question
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("Admin"),
  questionController.createQuestion
);

// Get all questions
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("Admin", "Student", "Parent"),
  questionController.getAllQuestions
);

// Update a question
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  questionController.updateQuestion
);

// Delete a question
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  questionController.deleteQuestion
);

module.exports = router;
