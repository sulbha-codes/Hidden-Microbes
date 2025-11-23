// ------------------ Microbe Data ------------------

// Good bacteria
const goodBacteria = [
    {name: "Lactobacillus", info: "Improves digestion and prevents harmful bacteria."},
    {name: "Bifidobacterium", info: "Supports immunity and nutrient absorption."},
    {name: "Streptococcus thermophilus", info: "Helps in yogurt fermentation."},
];

// Bad bacteria
const badBacteria = [
    {name: "E. coli (pathogenic)", info: "Causes diarrhea if contaminated food is eaten."},
    {name: "Salmonella", info: "Causes food poisoning."},
    {name: "Staphylococcus aureus", info: "Can cause skin infections and food contamination."},
];

// ------------------ Generate Cards ------------------
function generateCards(containerId, bacteriaArray) {
    const container = document.getElementById(containerId);
    bacteriaArray.forEach(bacteria => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${bacteria.name}</div>
                <div class="card-back">
                    <p>${bacteria.info}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

generateCards("good-cards", goodBacteria);
generateCards("bad-cards", badBacteria);

// ------------------ Microbe of the Day ------------------
const allMicrobes = [...goodBacteria, ...badBacteria];
function displayMicrobeOfDay() {
    const random = allMicrobes[Math.floor(Math.random() * allMicrobes.length)];
    const container = document.getElementById("microbe-of-day");
    container.innerHTML = `
        <h3>${random.name}</h3>
        <p>${random.info}</p>
    `;
}
displayMicrobeOfDay();

// ------------------ Light/Dark Mode ------------------
const modeBtn = document.getElementById("mode-toggle");
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    modeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ------------------ Quiz ------------------
const quizData = [
    {
        question: "Which bacteria helps digestion?",
        options: ["E. coli", "Lactobacillus", "Salmonella", "Staphylococcus aureus"],
        answer: "Lactobacillus"
    },
    {
        question: "Which bacteria causes food poisoning?",
        options: ["Bifidobacterium", "Salmonella", "Streptococcus thermophilus", "Lactobacillus"],
        answer: "Salmonella"
    },
    {
        question: "Which bacteria is beneficial in yogurt fermentation?",
        options: ["E. coli", "Streptococcus thermophilus", "Staphylococcus aureus", "Salmonella"],
        answer: "Streptococcus thermophilus"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

// Disable Next initially
nextBtn.disabled = true;

function loadQuestion() {
    nextBtn.disabled = true; // Disable Next at the start
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("quiz-option");
        btn.onclick = () => checkAnswer(opt, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const correctAnswer = quizData[currentQuestion].answer;

    // Disable all option buttons
    const allBtns = optionsEl.querySelectorAll("button");
    allBtns.forEach(b => b.disabled = true);

    // Highlight selected button
    if (selected === correctAnswer) {
        btn.style.backgroundColor = "#4CAF50"; // Green for correct
        score++;
    } else {
        btn.style.backgroundColor = "#f44336"; // Red for wrong
        // Highlight correct answer
        allBtns.forEach(b => {
            if (b.textContent === correctAnswer) {
                b.style.backgroundColor = "#4CAF50";
            }
        });
    }

    // Enable Next button
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = "";
        scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
        nextBtn.style.display = "none"; // Hide Next after quiz ends
    }
};

// Load the first question
loadQuestion();