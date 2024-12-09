// Timer Setup
let totalSeconds = 3600; // 1 hour in seconds
const timerElement = document.getElementById("time-left");

function updateTimer() {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    if (totalSeconds === 0) {
        submitTest();
    } else {
        totalSeconds--;
    }
}

const timerInterval = setInterval(updateTimer, 1000);

// Test Navigation and Submission
const submitButton = document.getElementById("submit");
const testContainer = document.getElementById("test-container");
const submissionScreen = document.getElementById("submission-screen");

function submitTest() {
    // Show an alert before redirecting
    alert("Test submitted! You will be redirected to the results page.");

    // Delay the redirection by 2 seconds (2000 milliseconds)
    setTimeout(() => {
        window.location.href = "../result.html"; // Replace with your actual URL
    }, 2000); // 2-second delay
}
submitButton.addEventListener("click", submitTest);

// Dynamic Question Navigation
const questionNav = document.getElementById("question-nav");
const questionTitle = document.querySelector(".question-title");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.getElementById("options");
const questions = [
    { text: "What is the cube root of 27?", options: ["1", "3", "9", "27"], answer: 1 },
    { text: "Simplify: (2x + 3x) - 4x", options: ["x", "2x", "5x", "0"], answer: 0 },
    { text: "What is the value of π to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
    { text: "Solve: 3² + 4² = ?", options: ["12", "16", "25", "20"], answer: 2 },
    { text: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
    { text: "If a = 3 and b = 4, what is a² + b²?", options: ["7", "12", "25", "24"], answer: 2 },
    { text: "Factorize: x² - 9", options: ["(x + 3)(x - 3)", "(x + 9)(x - 9)", "x(x - 9)", "None"], answer: 0 },
    { text: "What is the value of 2⁵?", options: ["10", "25", "32", "64"], answer: 2 },
    { text: "Find the area of a triangle with base 5 cm and height 10 cm.", options: ["15 cm²", "25 cm²", "50 cm²", "10 cm²"], answer: 1 },
    { text: "What is the perimeter of a square with side 6 cm?", options: ["24 cm", "12 cm", "36 cm", "18 cm"], answer: 0 },
];


let currentQuestionIndex = 0;
let answers = Array(questions.length).fill(null); // Store answers
let reviewQuestions = []; // Store questions marked for review

// Load a question dynamically
function loadQuestion(index) {
    const question = questions[index];
    questionTitle.textContent = `Question ${index + 1}`;
    questionText.textContent = question.text;
    optionsContainer.innerHTML = "";

    // Add options dynamically
    question.options.forEach((option, idx) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="radio" name="answer" id="opt${idx}" ${answers[index] === idx ? "checked" : ""}>
            <label for="opt${idx}">${option}</label>
        `;
        li.querySelector("input").addEventListener("change", () => {
            answers[index] = idx; // Save the selected answer
            updateNavStatus();
        });
        optionsContainer.appendChild(li);
    });

    updateNavStatus(); // Update navigation button status
}

// Update navigation button statuses (answered, current, review)
function updateNavStatus() {
    const questionButtons = document.querySelectorAll(".question-nav button");
    questionButtons.forEach((btn, idx) => {
        btn.className = idx === currentQuestionIndex ? "current" : answers[idx] !== null ? "answered" : "";
        if (reviewQuestions.includes(idx)) btn.classList.add("review");
    });
}

// Populate question navigation dynamically
function populateQuestionNav() {
    questions.forEach((_, idx) => {
        const btn = document.createElement("button");
        btn.textContent = idx + 1;
        btn.addEventListener("click", () => {
            currentQuestionIndex = idx;
            loadQuestion(idx);
        });
        questionNav.appendChild(btn);
    });
}

// Navigation Buttons
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const markReviewButton = document.getElementById("mark-review");

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

markReviewButton.addEventListener("click", () => {
    if (!reviewQuestions.includes(currentQuestionIndex)) {
        reviewQuestions.push(currentQuestionIndex); // Mark for review
    } else {
        reviewQuestions = reviewQuestions.filter((q) => q !== currentQuestionIndex); // Unmark if already marked
    }
    updateNavStatus();
});

// Initialize test
populateQuestionNav();
loadQuestion(0);
