const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const promptText = `"academicInfo": {
//         "grade": "10th Grade",
//         "gpa": 3.8,
//         "favoriteSubjects": [
//             "Mathematics",
//             "Science"
//         ],
//         "strengths": [
//             "Problem Solving",
//             "Critical Thinking"
//         ]
//     },
//     "extracurricularActivities": [
//         {
//             "name": "Math Club",
//             "description": "Participates in regional math competitions",
//             "duration": "2 years",
//             "position": "Member"
//         }
//     ],
//     "awards": [
//         {
//             "title": "Math Olympiad Winner",
//             "description": "First place in state-level competition",
//             "date": "2022-05-15"
//         }
//     ]
//     {
//   "questionnaireResponses": [
//     {
//       "question": "Career Interest",
//       "response": "Scientist"
//     },
//     {
//       "question": "Motivation",
//       "response": "I am fascinated by how the world works, especially in the areas of mathematics and science. I enjoy problem-solving and want to explore scientific discoveries that can help people."
//     },
//     {
//       "question": "Skills Assessment",
//       "response": "Problem-solving, Critical Thinking"
//     },
//     {
//       "question": "School Subjects",
//       "response": ["Mathematics", "Science"]
//     },
//     {
//       "question": "Future Education Plans",
//       "response": "I plan to study engineering or physics in college."
//     },
//     {
//       "question": "Hobbies and Interests",
//       "response": "Math competitions, Reading scientific journals"
//     },
//     {
//       "question": "Role Models",
//       "response": "Marie Curie, because she made groundbreaking contributions to science despite many challenges."
//     },
//     {
//       "question": "Extracurricular Activities",
//       "response": "I am a member of the Math Club where I participate in math competitions. It helps me improve my problem-solving skills and gain confidence in competitive environments."
//     },
//     {
//       "question": "Technology Use",
//       "response": "I use my computer and the internet to research scientific concepts and practice problem-solving on educational apps like Brilliant and Khan Academy."
//     },
//     {
//       "question": "Leadership Experience",
//       "response": "I haven't taken on any major leadership roles yet, but I have led small group projects in math class."
//     },
//     {
//       "question": "Communication Skills",
//       "response": "I enjoy working with others, especially when solving math problems as a team. I think my communication skills are strong when it comes to sharing ideas and collaborating on solutions."
//     },
//     {
//       "question": "Teamwork",
//       "response": "I like working in groups, especially during math club competitions, as we can solve problems faster when we share ideas."
//     },
//     {
//       "question": "Travel for Work",
//       "response": "Yes, I would love to travel for work, especially if it means attending scientific conferences or working on international research projects."
//     },
//     {
//       "question": "Continuous Learning",
//       "response": "It is very important to me to keep learning new things, especially in science where discoveries are always being made."
//     },
//     {
//       "question": "Creativity",
//       "response": "I enjoy solving problems in creative ways, especially when approaching challenging math problems or creating experiments in science class."
//     },
//     {
//       "question": "Cultural Awareness",
//       "response": "I think it's important to understand different cultures, especially in a scientific career where collaboration with people from around the world is common."
//     },
//     {
//       "question": "Work-Life Balance",
//       "response": "It's important to balance work and personal life, but I believe that if you are passionate about what you do, the lines can blur sometimes."
//     },
//     {
//       "question": "Volunteering",
//       "response": "I haven't volunteered much, but I would like to in the future, maybe in areas related to education or science."
//     },
//     {
//       "question": "Support Systems",
//       "response": "I rely on my teachers and family for advice, especially my math and science teachers who encourage me to pursue my interests."
//     },
//     {
//       "question": "School Projects",
//       "response": "I am most proud of a project where I built a model to demonstrate how renewable energy can be used in everyday life."
//     },
//     {
//       "question": "Personal Strengths",
//       "response": "I think my ability to stay focused on problems and my passion for learning new things will help me in my future career."
//     }
//   ]
// }
// `;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getCareerSuggestions = async function (prompt) {
  const result = await model.generateContent(prompt);
  console.log(JSON.parse(result.response.text().replace(/```json|```/g, "")));
  console.log("ai gave respose");

  //   return result.response.text();
  return JSON.parse(result.response.text().replace(/```json|```/g, ""));
};

module.exports = { getCareerSuggestions };
