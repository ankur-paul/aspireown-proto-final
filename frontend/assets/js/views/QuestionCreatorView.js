// js/views/QuestionCreatorView.js

export default class QuestionCreatorView {
  constructor() {
    this.app = document.getElementById("app");
  }

  // Render the question creation form
  render() {
    this.app.innerHTML = `
            <div class="question-creator-container">
                <h2>Create a New Question</h2>
                <form id="question-form">
                    <div>
                        <label for="question-text">Question:</label>
                        <textarea id="question-text" name="questionText" rows="4" required></textarea>
                    </div>
                    <div>
                        <label for="question-type">Type:</label>
                        <select id="question-type" name="questionType" required>
                            <option value="">Select Type</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="short-answer">Short Answer</option>
                            <option value="essay">Essay</option>
                            <!-- Add more types as needed -->
                        </select>
                    </div>
                    <div id="options-container" style="display: none;">
                        <label>Options:</label>
                        <div id="options-list">
                            <div class="option-item">
                                <input type="text" name="options" placeholder="Option 1" required />
                            </div>
                        </div>
                        <button type="button" id="add-option-button">Add Option</button>
                    </div>
                    <button type="submit">Submit Question</button>
                </form>
                <div id="question-error" class="error-message" style="display: none;"></div>
                <div id="question-success" class="success-message" style="display: none;"></div>
            </div>
        `;
  }

  // Bind event listeners for the form
  bindCreateQuestion(handler) {
    const form = document.getElementById("question-form");
    const questionTypeSelect = document.getElementById("question-type");
    const optionsContainer = document.getElementById("options-container");
    const addOptionButton = document.getElementById("add-option-button");
    const optionsList = document.getElementById("options-list");
    const errorDiv = document.getElementById("question-error");
    const successDiv = document.getElementById("question-success");

    // Show or hide options based on question type
    questionTypeSelect.addEventListener("change", () => {
      if (questionTypeSelect.value === "multiple-choice") {
        optionsContainer.style.display = "block";
      } else {
        optionsContainer.style.display = "none";
      }
    });

    // Add new option input fields for multiple-choice questions
    addOptionButton.addEventListener("click", () => {
      const optionCount = optionsList.children.length + 1;
      const optionItem = document.createElement("div");
      optionItem.className = "option-item";
      optionItem.innerHTML = `
                <input type="text" name="options" placeholder="Option ${optionCount}" required />
                <button type="button" class="remove-option-button">Remove</button>
            `;
      optionsList.appendChild(optionItem);

      // Bind remove button
      optionItem
        .querySelector(".remove-option-button")
        .addEventListener("click", () => {
          optionsList.removeChild(optionItem);
        });
    });

    // Handle form submission
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorDiv.style.display = "none";
      successDiv.style.display = "none";

      const formData = new FormData(form);
      const questionText = formData.get("questionText").trim();
      const questionType = formData.get("questionType");
      let options = [];

      if (questionType === "multiple-choice") {
        formData.getAll("options").forEach((option) => {
          const trimmedOption = option.trim();
          if (trimmedOption) {
            options.push(trimmedOption);
          }
        });

        if (options.length < 2) {
          errorDiv.textContent =
            "Please provide at least two options for multiple-choice questions.";
          errorDiv.style.display = "block";
          return;
        }
      }

      const questionData = {
        questionText,
        questionType,
        ...(questionType === "multiple-choice" && { options }),
      };

      try {
        await handler(questionData);
        successDiv.textContent = "Question submitted successfully!";
        successDiv.style.display = "block";
        form.reset();
        optionsContainer.style.display = "none";
        // Reset options list to one option
        optionsList.innerHTML = `
                    <div class="option-item">
                        <input type="text" name="options" placeholder="Option 1" required />
                    </div>
                `;
      } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = "block";
      }
    });
  }

  // Optionally, methods to clear messages
  clearMessages() {
    const errorDiv = document.getElementById("question-error");
    const successDiv = document.getElementById("question-success");
    errorDiv.style.display = "none";
    successDiv.style.display = "none";
  }
}
