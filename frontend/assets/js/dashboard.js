const homebutt = document.getElementById("home-button");
const API_URL = "http://localhost:3500/api";
homebutt.addEventListener("click", () => {
  window.location.href = "/index.html";
});

const quesBtn = document.getElementById("ques-button");
quesBtn.addEventListener("click", () => {
  window.location.href = "/pages/question.html";
});

const fetchCareerSuggestions = async function () {
  try {
    console.log("inside fetch career");

    showLoadingText();
    const response = await fetch(`${API_URL}/careers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.status === 401) {
      // Attempt to refresh token
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        throw new Error("Authentication required");
      }
      // Retry fetching career suggestions
      return this.fetchCareerSuggestions();
    }

    const data = await response.json();

    hideLoadingText();

    displayCareerSuggestions(data);
    console.log(data, "fetch career suggestion");

    const careersArray = data.careerSuggestions.map(
      (suggestion) => suggestion.title || suggestion.career
    );
    await fetchCareerResources(careersArray);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch career suggestions");
    }

    return data;
  } catch (error) {
    console.error("Fetch Career Suggestions Error:", error);
    throw error;
  }
};
document
  .querySelector(".career-suggestion-heading")
  .addEventListener("click", () => {
    console.log("hello");

    fetchCareerSuggestions();
  });

const careerList = document.getElementById("career-suggestions-list");

const displayCareerSuggestions = async function (resourceRecommendationObj) {
  const careerSuggestions = resourceRecommendationObj.careerSuggestions;
  const resourceSection = document.getElementById("career-suggestions");

  if (!resourceSection) {
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
  console.log(resourceRecommendationObj);

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
};
const displayResourcesRecomendation = async function (
  resourceRecommendationObj
) {
  console.log("inside display resource", resourceRecommendationObj);

  const careerSuggestions = resourceRecommendationObj.careerSuggestionsResouces;
  const keysArray = Object.keys(careerSuggestions);
  console.log(keysArray);

  const resourceSection = document.getElementById("resource-suggestions");

  if (!resourceSection) {
    // If the section doesn't exist, create it
    const section = document.createElement("section");
    section.id = "career-suggestions";
    section.innerHTML = `
            <h3>Your Career Suggestions</h3>
            <ul id="career-suggestions-list"></ul>
        `;
    this.app.appendChild(section);
  }

  const list = document.getElementById("resources-list");
  list.innerHTML = ""; // Clear any existing suggestions
  console.log(careerSuggestions);
  console.log(resourceRecommendationObj);

  // console.log(careerSuggestions.careerSuggestions);

  if (keysArray && keysArray.length > 0) {
    // Object.entries(careerSuggestions).map((entry) => {

    //   let key = entry[0];
    //   let value = entry[1];
    //   console.log(key, value);
    //   const listItem = document.createElement("li");
    //   listItem.innerHTML = `
    //             <h4>${key}</h4>
    //             <p>${[...value]}</p>

    //         `;
    //   list.appendChild(listItem);
    // });

    keysArray.forEach((career) => {
      // Create a list item for each career
      const careerListItem = document.createElement("li");

      // Create a header for the career name
      const careerHeader = document.createElement("h4");
      careerHeader.textContent = career;
      careerListItem.appendChild(careerHeader);

      // Create a nested list for resources
      const resourcesList = document.createElement("ul");

      // Loop through each resource for the career
      console.log(career);

      console.log(careerSuggestions[career]);

      careerSuggestions[career].forEach((resourceObj) => {
        const resource = resourceObj.resource; // Access nested resource object
        const link = resourceObj.link;
        console.log(resource, link);

        const resourceItem = document.createElement("li");
        resourceItem.innerHTML = `<span>${resource}: </span>
          <a href="${link}" target="_blank">${link}</a>
        `;
        resourcesList.appendChild(resourceItem);
      });

      careerListItem.appendChild(resourcesList);
      list.appendChild(careerListItem);
    });
  } else {
    list.innerHTML = "<li>No career suggestions available at this time.</li>";
  }
};

const fetchCareerResources = async function (careersArray) {
  try {
    console.log("inside fetch resources");

    // showLoadingText();

    const response = await fetch(`${API_URL}/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },

      body: JSON.stringify({
        careers: careersArray.join(", "),
      }),
    });

    if (response.status === 401) {
      // Attempt to refresh token
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        throw new Error("Authentication required");
      }
      // Retry fetching career suggestions
      return this.fetchCareerSuggestions();
    }

    const data = await response.json();

    // hideLoadingText();
    displayResourcesRecomendation(data);

    console.log(data, "fetch resource  suggestion");

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch career suggestions");
    }

    return data;
  } catch (error) {
    console.error("Fetch Career Suggestions Error:", error);
    throw error;
  }
};

function showLoadingText() {
  // Find the element where you want to show the loading text
  const loadingElement = document.getElementById(`loadingText`);
  // Set the loading message
  loadingElement.innerHTML = "     (Loading... Please wait.)";
}

// Function to hide loading text after loading is done
function hideLoadingText() {
  const loadingElement = document.getElementById(`loadingText`);
  loadingElement.innerHTML = ""; // Clear the loading text
}

(async () => {
  await fetchCareerSuggestions();
})();
