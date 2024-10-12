const getstart = document.getElementById("button1");
getstart.addEventListener("click", () => {
  window.location.href = "/pages/login.html";
});

const mainDiv = document.querySelector(".content");
mainDiv.id = "app";

if (localStorage.getItem("buttonClicked") === "true") {
  document.getElementById("button1").textContent = "Your Profile"; // Change button text
}

document.getElementById("button1").addEventListener("click", function () {
  this.textContent = "Your Profile";

  localStorage.setItem("buttonClicked", "true");
});
