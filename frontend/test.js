//this file is jsut of testing not using in the project
// let hello = `<div class="dashboard-container">
//                 <nav>
//                     <button id="logout-button">Logout</button>
//                 </nav>
//                 <h2>Welcome, ${this.userData.personalInfo.fullName.split(
//                   " "[0]
//                 )}
// </h2> 
//                 <section>
//                     <h3>Your Profile</h3>
//                     <p>Name: ${this.userData.personalInfo.fullName}</p>
//                     <p>Grade: ${this.userData.academicInfo.grade}</p>
//                     <p>GPA: ${this.userData.academicInfo.gpa}</p>
//                     <!-- Add more profile details as needed -->
//                 </section>

//                 <section>
//                     <h3>Your Career Suggestions</h3>
//                     <ul id="career-suggestions-list">
//                         ${
//                           this.userData.careerSuggestions.length > 0
//                             ? this.userData.careerSuggestions
//                                 .map(
//                                   (suggestion) => `
//                                 <li>
//                                     <h4>${suggestion.career.title}</h4>
//                                     <p>${suggestion.career.description}</p>
//                                     <p>Relevance Score: ${suggestion.relevanceScore}</p>
//                                 </li>
//                             `
//                                 )
//                                 .join("")
//                             : "<li>No career suggestions available.</li>"
//                         }
//                     </ul>
//                 </section>

//                 <section>
//                     <h3>Available Resources</h3>
//                     <ul id="resources-list">
//                         ${
//                           this.userData.resources.length > 0
//                             ? this.userData.resources
//                                 .map(
//                                   (resource) => `
//                                 <li>
//                                     <a href="${resource.resource.link}" target="_blank">${resource.resource.title}</a>
//                                     <p>${resource.resource.description}</p>
//                                     <p>Status: ${resource.status}</p>
//                                 </li>
//                             `
//                                 )
//                                 .join("")
//                             : "<li>No resources available.</li>"
//                         }
//                     </ul>
//                 </section>
//             </div>`
//             const cssfile = document.createElement("link")
//         cssfile.rel = "stylesheet"
//         cssfile.href = "/assets/css/dashboard.css"

//         document.head.appendChild(cssfile);
//         const externalJS = document.createElement('script');
//         externalJS.src = '/assets/js/dashboard.js';
//         document.body.appendChild(externalJS);