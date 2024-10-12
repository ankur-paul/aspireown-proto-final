import { API_URL } from "../config.js";
// import { router } from "../utils/router.js";

// const API_URL = "http://localhost:3500/api";

export default class AuthModel {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken") || null;
  }

  // Login User
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        credentials: "include", // Include cookies (for refresh token)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // this.accessToken = data.accessToken;

      const accessToken = data.accessToken;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // location.reload();

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }
  // Register User
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        credentials: "include", // Include cookies (for refresh token)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  // Logout User
  async logout() {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: "" }), // Backend handles clearing the cookie
      });

      // const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      this.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("buttonClicked");
      return "logout successfull";
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  }

  // Get Access Token
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // Set Access Token (used after refreshing)
  setAccessToken(token) {
    this.accessToken = token;
    localStorage.setItem("accessToken", token);
  }
}

// import { API_URL } from "../config.js";
// // import { router } from "../utils/router.js";

// // const API_URL = "http://localhost:3500/api";

// export default class AuthModel {
//   constructor() {
//     this.accessToken = localStorage.getItem("accessToken") || null;
//   }

//   // Login User
//   async login(credentials) {
//     try {
//       const response = await fetch(`${API_URL}/auth`, {
//         method: "POST",
//         credentials: "include", // Include cookies (for refresh token)
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // this.accessToken = data.accessToken;

//       const accessToken = data.accessToken;
//       console.log(accessToken);
//       localStorage.setItem("accessToken", accessToken);

//       // location.reload();

//       return data;
//     } catch (error) {
//       console.error("Login Error:", error);
//       throw error;
//     }
//   }
//   // Register User
//   async register(userData) {
//     try {
//       const response = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         credentials: "include", // Include cookies (for refresh token)
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }
//       return data;
//     } catch (error) {
//       console.error("Login Error:", error);
//       throw error;
//     }
//   }

//   // Logout User
//   async logout() {
//     try {
//       const response = await fetch(`${API_URL}/logout`, {
//         method: "POST",
//         credentials: "include", // Include cookies
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken: "" }), // Backend handles clearing the cookie
//       });

//       // const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Logout failed");
//       }

//       this.accessToken = null;
//       localStorage.removeItem("accessToken");
//       return "logout successfull";
//     } catch (error) {
//       console.error("Logout Error:", error);
//       throw error;
//     }
//   }

//   // Get Access Token
//   getAccessToken() {
//     return localStorage.getItem("accessToken");
//   }

//   // Set Access Token (used after refreshing)
//   setAccessToken(token) {
//     this.accessToken = token;
//     localStorage.setItem("accessToken", token);
//   }
// }
