import { API_URL } from "../config.js";

export default class UserModel {
  constructor(authModel) {
    this.authModel = authModel;
    this.user = null;
  }

  // Fetch User Profile
  async fetchUserProfile() {
    try {
      console.log(this.authModel);

      console.log(this.authModel.getAccessToken(), "line 14 in usermodel");
      console.log(localStorage.getItem("accessToken"), "line 14 in usermodel");

      const tempToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6ImFua3VyQGdtYWlsLmNvbSIsInJvbGVzIjpbMV19LCJpYXQiOjE3Mjg0OTg2NTMsImV4cCI6MTcyODUwMjI1M30.aJWbBJocMBNxrJMyd3ejKJ_BzAkpUsqASzin4_Wewk0";

      const response = await fetch(`${API_URL}/students/profile`, {
        method: "GET",
        credentials: "include", // Include cookies (for refresh token)
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${this.authModel.getAccessToken()}`,
          // authorization: `Bearer ${tempToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        console.log("error 401 unauthorised");

        // Attempt to refresh token
        let count = 0;
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          throw new Error("Authentica   tion required");
        }

        // Retry fetching profile
        if (count > 1) this.authModel.logout();
        return this.fetchUserProfile();
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
      }
      console.log(data, "result of fetchUserProfile");

      this.user = data;
      return data;
    } catch (error) {
      console.error("Fetch User Profile Error:", error);
      throw error;
    }
  }

  // Refresh Access Token
  async refreshToken() {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: "GET",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({}), // No body needed if refresh token is in cookie
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token refresh failed");
      }
      console.log(data);

      this.authModel.setAccessToken(data.acessToken);
      return true;
    } catch (error) {
      console.error("Token Refresh Error:", error);
      return false;
    }
  }

  // Update User Profile
  async updateUserProfile(updatedData) {
    try {
      const response = await fetch(`${API_URL}/students/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authModel.getAccessToken()}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.status === 401) {
        // Attempt to refresh token
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          throw new Error("Authentication required");
        }
        // Retry updating profile
        return this.updateUserProfile(updatedData);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      this.user = data;
      return data;
    } catch (error) {
      console.error("Update User Profile Error:", error);
      throw error;
    }
  }

  async fetchCareerSuggestions() {
    try {
      console.log("inside fetch career");

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
      console.log(data, "fetch career suggestion");

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch career suggestions");
      }

      return data;
    } catch (error) {
      console.error("Fetch Career Suggestions Error:", error);
      throw error;
    }
  }

  async submitQuestionnaire(responses) {
    try {
      const response = await fetch(`${API_URL}/students/questionnaire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authModel.getAccessToken()}`,
        },
        body: JSON.stringify({ responses }),
      });

      if (response.status === 401) {
        // Attempt to refresh token
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          throw new Error("Authentication required");
        }
        // Retry submitting questionnaire
        return this.submitQuestionnaire(responses);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit questionnaire");
      }

      return data;
    } catch (error) {
      console.error("Submit Questionnaire Error:", error);
      throw error;
    }
  }
}
