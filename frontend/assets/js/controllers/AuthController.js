import AuthModel from "../models/AuthModel.js";
import UserModel from "../models/UserModel.js";
import LoginView from "../views/LoginView.js";
import RegisterView from "../views/RegisterView.js";
import DashboardView from "../views/DashboardView.js";

export default class AuthController {
  constructor() {
    this.authModel = new AuthModel();
    this.userModel = new UserModel(this.authModel);
    this.loginView = new LoginView();
    this.registerView = new RegisterView();
    this.dashboardView = null;
  }

  // Initialize the application based on authentication status
  initialize() {
    if (this.authModel.getAccessToken()) {
      this.loadDashboard();
    } else {
      this.showLogin();
    }
  }

  // Show Login View
  showLogin() {
    this.loginView.render();
    this.loginView.bindLogin(this.handleLogin.bind(this));
  }

  // Show Register View
  showRegister() {
    this.registerView.render();
    this.registerView.bindRegister(this.handleRegister.bind(this));
  }

  // Handle Login
  async handleLogin(credentials) {
    try {
      await this.authModel.login(credentials);
      console.log("acess token", this.authModel.getAccessToken());

      await this.userModel.fetchUserProfile();
      this.loadDashboard();
    } catch (error) {
      throw error;
    }
  }

  // Handle Registration
  async handleRegister(userData) {
    try {
      const res = await this.authModel.register(userData);
      console.log(res);

      // After successful registration, redirect to login
      this.showLogin();
    } catch (error) {
      throw error;
    }
  }

  // Load Dashboard
  async loadDashboard() {
    try {
      const userData = await this.userModel.fetchUserProfile();
      this.dashboardView = new DashboardView(userData);
      this.dashboardView.render();
      this.dashboardView.bindLogout(this.handleLogout.bind(this));
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      this.showLogin();
    }
  }

  // Handle Logout
  async handleLogout() {
    try {
      await this.authModel.logout();
      this.dashboardView = null;
      this.showLogin();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}
