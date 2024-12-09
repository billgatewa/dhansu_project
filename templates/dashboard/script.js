let currentQuestion = 1;
let answeredQuestions = {}; // To store answers and review status

// Function to show the question based on the question number
function showQuestion(questionNo) {
    currentQuestion = questionNo;

    // Update question text and options (Replace with dynamic loading in real case)
    document.getElementById("question-title").textContent = `Question ${questionNo}:`;
    document.getElementById("question-text").textContent = `This is Question ${questionNo}.`;

    // Clear previous selections
    const options = document.getElementsByName(`q${questionNo}`);
    options.forEach(option => option.checked = false);

    // Mark the active question button
    document.querySelectorAll(".question-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`.question-btn:nth-child(${questionNo})`).classList.add("active");

    // Load saved answer or marked status for review
    if (answeredQuestions[questionNo]) {
        const savedAnswer = answeredQuestions[questionNo].answer;
        const reviewStatus = answeredQuestions[questionNo].review;

        // Mark the saved answer
        if (savedAnswer) {
            document.querySelector(`input[name="q${questionNo}"][value="${savedAnswer}"]`).checked = true;
        }

        // Mark for review status
        if (reviewStatus) {
            document.querySelector(`.question-btn:nth-child(${questionNo})`).classList.add("review");
        }
    }
}

// Move to the next question
function nextQuestion() {
    if (currentQuestion < 5) {
        showQuestion(currentQuestion + 1);
    } else {
        submitTest();
    }
}

// Move to the previous question
function prevQuestion() {
    if (currentQuestion > 1) {
        showQuestion(currentQuestion - 1);
    }
}

// Save the current answer and move to the next question
function saveAndNext() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        // Save the answer
        answeredQuestions[currentQuestion] = {
            answer: selectedOption.value,
            review: false
        };
        markCompleted(currentQuestion);
    } else {
        // If no answer selected, keep it saved as null for review
        answeredQuestions[currentQuestion] = { answer: null, review: false };
    }

    nextQuestion();
}

// Mark the current question for review
function markForReview() {
    const btn = document.querySelector(`.question-btn:nth-child(${currentQuestion})`);
    const currentStatus = answeredQuestions[currentQuestion] ? answeredQuestions[currentQuestion].review : false;

    // Toggle the review status
    if (currentStatus) {
        btn.classList.remove("review");
        answeredQuestions[currentQuestion].review = false;
    } else {
        btn.classList.add("review");
        if (!answeredQuestions[currentQuestion]) {
            answeredQuestions[currentQuestion] = { answer: null, review: true };
        } else {
            answeredQuestions[currentQuestion].review = true;
        }
    }
}

// Mark the question as completed when an answer is saved
function markCompleted(questionNo) {
    const btn = document.querySelector(`.question-btn:nth-child(${questionNo})`);
    if (!answeredQuestions[questionNo].review) {
        btn.classList.add("completed");
    }
    btn.classList.remove("review");
}

// Submit the test and show confirmation
function submitTest() {
    document.querySelector(".test-container").classList.add("hidden");
    document.getElementById("test-submitted").classList.remove("hidden");

    // Store all the answers and review statuses in the console or send to the backend for processing
    console.log(answeredQuestions);
}

// Load the first question on page load
document.addEventListener("DOMContentLoaded", () => {
    showQuestion(1);
});
