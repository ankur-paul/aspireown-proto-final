// js/controllers/CareerController.js

import UserModel from "../models/UserModel.js";
import DashboardView from "../views/DashboardView.js"; // Assuming DashboardView handles displaying career suggestions

export default class CareerController {
  constructor() {
    this.userModel = new UserModel();
    this.dashboardView = new DashboardView();
  }

  // Method to load career suggestions
  async loadCareerSuggestions() {
    try {
      // Show loading indicator
      //   this.dashboardView.showLoading();

      // Fetch career suggestions from the Model
      const careerSuggestions = await this.userModel.fetchCareerSuggestions();

      // Update the View with the fetched suggestions
      this.dashboardView.displayCareerSuggestions(careerSuggestions);
    } catch (error) {
      // Handle errors by displaying them in the View
      this.dashboardView.displayError(error.message);
    } finally {
      // Hide loading indicator
      this.dashboardView.hideLoading();
    }
  }
}
