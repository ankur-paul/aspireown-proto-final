import UserModel from "../models/UserModel.js";
import DashboardView from "../views/DashboardView.js";

export default class StudentController {
  constructor(userModel) {
    this.userModel = userModel;
    this.dashboardView = new DashboardView(this.userModel.user);
  }

  // Initialize Dashboard
  async initialize() {
    try {
      const userData = await this.userModel.fetchUserProfile();
      this.dashboardView = new DashboardView(userData);
      this.dashboardView.render();
      this.dashboardView.bindLogout(this.handleLogout.bind(this));
      // Bind additional events like submitting questionnaires
    } catch (error) {
      console.error("Failed to initialize student dashboard:", error);
      // Optionally, redirect to login or show error
    }
  }

  // Handle Logout (if separate from AuthController)
  async handleLogout() {
    try {
      await this.userModel.authModel.logout();
      this.dashboardView = null;
      // Redirect to login or show login view
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async loadCareerSuggestions() {
    try {
      const suggestions = await this.userModel.fetchCareerSuggestions();
      this.dashboardView.updateCareerSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to load career suggestions:", error);
      // Optionally, display an error message to the user
    }
  }

  // Additional methods for handling student actions can be added here
}

// import UserModel from "../models/UserModel.js";
// import DashboardView from "../views/DashboardView.js";

// export default class StudentController {
//   constructor(userModel) {
//     this.userModel = userModel;
//     this.dashboardView = new DashboardView(this.userModel.user);
//   }

//   // Initialize Dashboard
//   async initialize() {
//     try {
//       const userData = await this.userModel.fetchUserProfile();
//       this.dashboardView = new DashboardView(userData);
//       this.dashboardView.render();
//       this.dashboardView.bindLogout(this.handleLogout.bind(this));
//       // Bind additional events like submitting questionnaires
//     } catch (error) {
//       console.error("Failed to initialize student dashboard:", error);
//       // Optionally, redirect to login or show error
//     }
//   }

//   // Handle Logout (if separate from AuthController)
//   async handleLogout() {
//     try {
//       await this.userModel.authModel.logout();
//       this.dashboardView = null;
//       // Redirect to login or show login view
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   }

//   async loadCareerSuggestions() {
//     try {
//       const suggestions = await this.userModel.fetchCareerSuggestions();
//       this.dashboardView.updateCareerSuggestions(suggestions);
//     } catch (error) {
//       console.error("Failed to load career suggestions:", error);
//       // Optionally, display an error message to the user
//     }
//   }

//   // Additional methods for handling student actions can be added here
// }
