const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");
const authMiddleware = require("../middleware/verifyJWT"); // If authentication is required
const authorizeRoles = require("../middleware/verifyRoles");

// GET /api/careers
router.get(
  "/",
  authMiddleware,
  authorizeRoles(1, 2, 3),
  careerController.getCareerSuggestions
);

// "/profile",
// authenticateJWT,
// // authorizeRoles("Student", "Parent", "Admin"),
// authorizeRoles(1, 2, 3),
// studentController.getProfile

module.exports = router;
