export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.handleRouteChange());
    window.addEventListener("load", () => this.handleRouteChange());
  }

  getCurrentRoute() {
    return window.location.hash.slice(1) || "/";
  }

  handleRouteChange() {
    const path = this.getCurrentRoute();
    const route = this.routes.find((r) => r.path === path);

    if (route) {
      route.action();
    } else {
      // Handle 404 - Not Found
      this.renderNotFound();
    }
  }

  navigate(path) {
    window.location.hash = path;
  }

  renderNotFound() {
    const app = document.getElementById("app");
    app.innerHTML = `
            <div class="not-found">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <a href="#/">Go to Home</a>
            </div>
        `;
  }
}

// export default class Router {
//   constructor(routes) {
//     this.routes = routes;
//     this.init();
//   }

//   init() {
//     window.addEventListener("hashchange", () => this.handleRouteChange());
//     window.addEventListener("load", () => this.handleRouteChange());
//   }

//   getCurrentRoute() {
//     return window.location.hash.slice(1) || "/";
//   }

//   handleRouteChange() {
//     const path = this.getCurrentRoute();
//     const route = this.routes.find((r) => r.path === path);

//     if (route) {
//       route.action();
//     } else {
//       // Handle 404 - Not Found
//       this.renderNotFound();
//     }
//   }

//   navigate(path) {
//     window.location.hash = path;
//   }

//   renderNotFound() {
//     const app = document.getElementById("app");
//     app.innerHTML = `
//             <div class="not-found">
//                 <h2>404 - Page Not Found</h2>
//                 <p>The page you are looking for does not exist.</p>
//                 <a href="#/">Go to Home</a>
//             </div>
//         `;
//   }
// }
