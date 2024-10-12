export default class RegisterView {
  constructor() {
    this.app = document.getElementById("app");
  }

  // Render the registration form
  render() {
    this.app.innerHTML = `
            <div class="register-container">
                <h2>Register</h2>
                <form id="register-form">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div>
                        <label for="role">Role:</label>
                        <select id="role" name="role" required>
                            <option value="">Select Role</option>
                            <option value="Student">Student</option>
                            <option value="Parent">Parent</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <!-- Additional fields based on role can be dynamically rendered -->
                    <button type="submit">Register</button>
                </form>
                <div id="register-error" class="error-message"></div>
                <p>Already have an account? <a href="#/login">Login here</a>.</p>
            </div>
        `;

    const cssfile = document.createElement("link");
    cssfile.rel = "stylesheet";
    cssfile.href = "/assets/css/register.css";
    cssfile.type = "text/css";
    document.head.appendChild(cssfile);
  }

  // Bind the registration handler
  bindRegister(handler) {
    const form = document.getElementById("register-form");
    const errorDiv = document.getElementById("register-error");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value.trim();
      const role = form.role.value;

      if (username && password && role) {
        // Gather additional data based on role
        // For simplicity, using empty objects
        const userData = {
          username,
          password,
          role,
          // Include additional data based on role
        };

        handler(userData).catch((error) => {
          errorDiv.textContent = error.message;
          errorDiv.style.display = "block";
        });
      } else {
        errorDiv.textContent = "Please fill in all required fields.";
        errorDiv.style.display = "block";
      }
    });
  }

  // Clear error messages
  clearError() {
    const errorDiv = document.getElementById("register-error");
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
}
