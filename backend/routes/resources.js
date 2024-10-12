const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourcesController");
const authMiddleware = require("../middleware/verifyJWT"); // If authentication is required
const authorizeRoles = require("../middleware/verifyRoles");

// GET /api/careers
router.post("/", authMiddleware, resourceController.getResources);

// "/profile",
// authenticateJWT,
// // authorizeRoles("Student", "Parent", "Admin"),
// authorizeRoles(1, 2, 3),
// studentController.getProfile

module.exports = router;
