export default class DashboardView {
  constructor(userData) {
    this.app = document.getElementById("app");
    this.userData = userData;
  }

  // Render the dashboard

  render() {
    this.app.innerHTML = `

  <div class="dashboard-container">

      <nav>

      <button id="home-button">Home Page</button>

      <div>
      
        <button id="ques-button" target="_blank">Attempt Questionnaire</button>
        <button id="logout-button">Logout</button>
      </div>

      </nav>

      <h2>Welcome, ${this.userData.personalInfo.fullName.split(" ")[0]}</h2>

      <section>

          <h3>Your Profile</h3>

          <p>Name: ${this.userData.personalInfo.fullName}</p>

          <p>Grade: ${this.userData.academicInfo.grade}</p>

          <p>GPA: ${this.userData.academicInfo.gpa}</p>

          <!-- Add more profile details as needed -->

      </section>



      <section id="career-suggestions">



          <h3 class="career-suggestion-heading"> Your Career Suggestions      <span id="loadingText"></span></h3>

          <ul id="career-suggestions-list">

              ${
                this.userData.careerSuggestions.length > 0
                  ? this.userData.careerSuggestions

                      .map(
                        (suggestion) => `

                          <li>

                              <h4>${suggestion.career.title}</h4>

                              <p>${suggestion.career.description}</p>

                              <p>Relevance Score: ${suggestion.relevanceScore}</p>

                          </li>

                      `
                      )

                      .join("")
                  : "<li>No career suggestions available.</li>"
              }

          </ul>

      </section>



      <section id="resource-suggestions">

      

          <h3>Available Resources  <span id="loadingText"></span></h3>
          

          <ul id="resources-list">

              ${
                this.userData.resources.length > 0
                  ? this.userData.resources

                      .map(
                        (resource) => `

                          <li>

                              <a href="${resource.resource.link}" target="_blank">${resource.resource.title}</a>

                              <p>${resource.resource.description}</p>

                              <p>Status: ${resource.status}</p>

                          </li>

                      `
                      )
                      .join("")
                  : "<li>No resources available.</li>"
              }
          </ul>
      </section>
  </div>`;

    const cssfile = document.createElement("link");

    cssfile.rel = "stylesheet";

    cssfile.href = "/assets/css/dashboard.css";

    document.head.appendChild(cssfile);

    const externalJS = document.createElement("script");

    externalJS.src = "/assets/js/dashboard.js";

    document.head.appendChild(externalJS);
  }

  // Bind the logout button
  bindLogout(handler) {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
      handler();
    });
  }

  // bind question view
  bindCreateQuestion(handler) {
    const createQuestionButton = document.getElementById(
      "create-question-button"
    );
    createQuestionButton.addEventListener("click", () => {
      handler(); // Trigger the handler to navigate to the question form
    });
  }

  // Update career suggestions dynamically
  updateCareerSuggestions(suggestions) {
    const list = document.getElementById("career-suggestions-list");
    list.innerHTML =
      suggestions.length > 0
        ? suggestions
            .map(
              (suggestion) => `
                <li>
                    <h4>${suggestion.career.title}</h4>
                    <p>${suggestion.career.description}</p>
                    <p>Relevance Score: ${suggestion.relevanceScore}</p>
                </li>
            `
            )
            .join("")
        : "<li>No career suggestions available.</li>";
  }

  // Update resources dynamically
  updateResources(resources) {
    const list = document.getElementById("resources-list");
    list.innerHTML =
      resources.length > 0
        ? resources
            .map(
              (resource) => `
                <li>
                    <a href="${resource.resource.link}" target="_blank">${resource.resource.title}</a>
                    <p>${resource.resource.description}</p>
                    <p>Status: ${resource.status}</p>
                </li>
            `
            )
            .join("")
        : "<li>No resources available.</li>";
  }

  // Display Career Suggestions
  displayCareerSuggestions(careerSuggestionsObj) {
    const careerSuggestions = careerSuggestionsObj.careerSuggestions;
    const careerSection = document.getElementById("career-suggestions");

    if (!careerSection) {
      // If the section doesn't exist, create it
      const section = document.createElement("section");
      section.id = "career-suggestions";
      section.innerHTML = `
            <h3>Your Career Suggestions</h3>
            <ul id="career-suggestions-list"></ul>
        `;
      this.app.appendChild(section);
    }

    const list = document.getElementById("career-suggestions-list");
    list.innerHTML = ""; // Clear any existing suggestions
    console.log(careerSuggestions);
    // console.log(careerSuggestions.careerSuggestions);

    if (careerSuggestions && careerSuggestions.length > 0) {
      careerSuggestions.forEach((suggestion) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <h4>${suggestion.title || suggestion.career}</h4>
                <p>${suggestion.description || suggestion.explanation}</p>
                <p><strong>Relevance Score:</strong> ${
                  suggestion.relevanceScore || suggestion.relevance_score
                }</p>

                
            `;
        list.appendChild(listItem);
      });
    } else {
      list.innerHTML = "<li>No career suggestions available at this time.</li>";
    }
  }

  // Show Loading Indicator
  showLoading() {
    let loadingDiv = document.getElementById("loading-indicator");

    if (!loadingDiv) {
      loadingDiv = document.createElement("div");
      loadingDiv.id = "loading-indicator";
      loadingDiv.innerHTML = `
            <p>Loading career suggestions...</p>
        `;
      this.app.appendChild(loadingDiv);
    }

    loadingDiv.style.display = "block";
  }

  // Hide Loading Indicator
  hideLoading() {
    const loadingDiv = document.getElementById("loading-indicator");
    if (loadingDiv) {
      loadingDiv.style.display = "none";
    }
  }

  // Display Error Message
  displayError(message) {
    let errorDiv = document.getElementById("career-error");

    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.id = "career-error";
      errorDiv.className = "error-message";
      this.app.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }
}
