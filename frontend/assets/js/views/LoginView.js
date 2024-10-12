// js/views/LoginView.js

export default class LoginView {
  constructor() {
    this.app = document.getElementById("app");
  }

  // Render the login form
  render() {
    this.app.innerHTML = `
            <div class="login-container">
                <h2>Login</h2>
                <form id="login-form">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div id="login-error" class="error-message"></div>
                <p>Don't have an account? <a href="#/register">Register here</a>.</p>
            </div>
        `;
    const cssfile = document.createElement("link");
    cssfile.rel = "stylesheet";
    cssfile.href = "/assets/css/login.css";
    cssfile.type = "text/css";
    document.head.appendChild(cssfile);
  }

  // Bind the login handler
  // js/views/LoginView.js

  bindLogin(handler) {
    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("login-error");

    if (!form) {
      console.error("Login form not found in the DOM.");
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Submit event triggered, preventDefault called.");

      const username = form.username.value.trim();
      const password = form.password.value.trim();

      if (username && password) {
        console.log("Calling handler with credentials:", {
          username,
          password,
        });
        handler({ username, password })
          .then(() => {
            console.log("Handler completed successfully.");
          })
          .catch((error) => {
            console.error("Handler threw an error:", error);
            errorDiv.textContent = error.message;
            errorDiv.style.display = "block";
          });
      } else {
        console.log("Validation failed: Username or password missing.");
        errorDiv.textContent = "Please enter both username and password.";
        errorDiv.style.display = "block";
      }
    });
  }

  // Clear error messages
  clearError() {
    const errorDiv = document.getElementById("login-error");
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
}
