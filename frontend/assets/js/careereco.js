const list = ["Scientist", "Doctor", "Computer Engineer", "Software Developer", "Actor", "Plumber"];

function renderCareerSuggestions() {
    
    document.body.innerHTML = `<header>
        <h1>Career Suggestions</h1>
    </header>
    <div class="card-container">
        <!-- Career 1 -->
        <div class="card" id="card1">
            <h2>${list[0]}</h2>
            <button class="explore">Explore</button>
        </div>

        <!-- Career 2 -->
        <div class="card" id="card2">
            <h2>${list[1]}</h2>
            <button class="explore">Explore</button>
        </div>

        <!-- Career 3 -->
        <div class="card" id="card3">
            <h2>${list[2]}</h2>
            <button class="explore">Explore</button>
        </div>

        <!-- Career 4 -->
        <div class="card" id="card4">
            <h2>${list[3]}</h2>
            <button class="explore">Explore</button>
        </div>

        <!-- Career 5 -->
        <div class="card" id="card5">
            <h2>${list[4]}</h2>
            <button class="explore">Explore</button>
        </div>
    </div>`;

    const exploreButtons = document.querySelectorAll(".explore");

    
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = "/pages/careerdetails.html";
        });
    });
}


window.onload = function() {
    renderCareerSuggestions();
};


window.onpageshow = function(event) {
    if (event.persisted) { 
        renderCareerSuggestions(); 
    }
};
