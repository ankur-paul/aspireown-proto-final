// js/controllers/QuestionController.js

import QuestionCreatorView from "../views/QuestionCreatorView.js";

export default class QuestionController {
  constructor() {
    this.questionCreatorView = new QuestionCreatorView();
  }

  // Initialize the question creator view
  initialize() {
    this.questionCreatorView.render();
    this.questionCreatorView.bindCreateQuestion(
      this.handleCreateQuestion.bind(this)
    );
  }

  // Handler to create a new question
  async handleCreateQuestion(questionData) {
    const API_URL = "http://localhost:3500/api/questions"; // Replace with your actual API URL

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("You must be logged in to create a question.");
      }

      const response = await fetch(`${API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(questionData),
      });

      if (response.status === 401) {
        // Optionally, trigger token refresh or redirect to login
        throw new Error("Unauthorized. Please log in again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create question.");
      }

      // Optionally, handle the successful creation (e.g., update UI, log, etc.)
    } catch (error) {
      console.error("Error creating question:", error);
      throw error; // Propagate the error to be handled in the view
    }
  }
}
