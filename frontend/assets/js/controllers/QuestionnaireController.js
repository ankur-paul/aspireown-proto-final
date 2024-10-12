// import QuestionnaireView from "../views/QuestionnaireView.js";

export default class QuestionnaireController {
  constructor(userModel) {
    this.userModel = userModel;
    this.questionnaireView = new QuestionnaireView();
  }

  // Initialize and render questionnaire
  async initialize() {
    try {
      const questions = await this.userModel.fetchQuestions(); // Implement fetchQuestions in UserModel or separate model
      this.questionnaireView.render(questions);
      this.questionnaireView.bindSubmit(this.handleSubmit.bind(this));
    } catch (error) {
      console.error("Failed to load questionnaire:", error);
      // Optionally, display an error message to the user
    }
  }

  // Handle questionnaire submission
  async handleSubmit(responses) {
    try {
      const submission = await this.userModel.submitQuestionnaire(responses);
      alert("Questionnaire submitted successfully!");
      // Optionally, redirect to dashboard or update the view
    } catch (error) {
      this.questionnaireView.showError(error.message);
    }
  }
}

// // import QuestionnaireView from "../views/QuestionnaireView.js";

// export default class QuestionnaireController {
//   constructor(userModel) {
//     this.userModel = userModel;
//     this.questionnaireView = new QuestionnaireView();
//   }

//   // Initialize and render questionnaire
//   async initialize() {
//     try {
//       const questions = await this.userModel.fetchQuestions(); // Implement fetchQuestions in UserModel or separate model
//       this.questionnaireView.render(questions);
//       this.questionnaireView.bindSubmit(this.handleSubmit.bind(this));
//     } catch (error) {
//       console.error("Failed to load questionnaire:", error);
//       // Optionally, display an error message to the user
//     }
//   }

//   // Handle questionnaire submission
//   async handleSubmit(responses) {
//     try {
//       const submission = await this.userModel.submitQuestionnaire(responses);
//       alert("Questionnaire submitted successfully!");
//       // Optionally, redirect to dashboard or update the view
//     } catch (error) {
//       this.questionnaireView.showError(error.message);
//     }
//   }
// }
