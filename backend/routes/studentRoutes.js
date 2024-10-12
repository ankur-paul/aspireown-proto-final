// routes/studentRoutes.js

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authenticateJWT = require("../middleware/verifyJWT");
const authorizeRoles = require("../middleware/verifyRoles");

console.log("student routes file");

// Get Student Profile
router.get(
  "/profile",
  authenticateJWT,
  // authorizeRoles("Student", "Parent", "Admin"),
  authorizeRoles(1, 2, 3),
  studentController.getProfile
);

// Update Student Profile
router.put(
  "/profile",
  authenticateJWT,
  authorizeRoles("Student", "Admin"),
  studentController.updateProfile
);

// Submit Questionnaire
router.post(
  "/questionnaire",
  authenticateJWT,
  authorizeRoles("Student"),
  studentController.submitQuestionnaire
);

// Get Career Suggestions
router.get(
  "/career-suggestions",
  authenticateJWT,
  authorizeRoles("Student", "Parent", "Admin"),
  studentController.getCareerSuggestions
);

// Access Resources
router.get(
  "/resources",
  authenticateJWT,
  authorizeRoles("Student"),
  studentController.getResources
);

module.exports = router;
