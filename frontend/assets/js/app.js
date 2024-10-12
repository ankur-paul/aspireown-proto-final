import AuthController from "./controllers/AuthController.js";
import CareerController from "./controllers/CareerController.js";

import Router from "./utils/router.js";

// Initialise Controllers
const authController = new AuthController();
const careerController = new CareerController();

// Define routes
const routes = [
  { path: "/", action: () => authController.initialize() },
  { path: "/login", action: () => authController.showLogin() },
  { path: "/register", action: () => authController.showRegister() },
  {
    path: "/dashboard",
    action: () => {
      authController.loadDashboard();
      careerController.loadCareerSuggestions(); // Fetch career suggestions when loading dashboard
    },
  },
  // Add more routes as needed
];

// Initialize Router
const router = new Router(routes);
