// signup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAyD36pE3D8RmyLvPFSjy46Gah5yfn5Wso",
    authDomain: "dhansu-project.firebaseapp.com",
    projectId: "dhansu-project",
    storageBucket: "dhansu-project.firebasestorage.app",
    messagingSenderId: "289403751046",
    appId: "1:289403751046:web:88d1c150e5edc0bb381f07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOMContentLoaded listener to ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup-form");

    // Email Signup Logic
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("User signed up:", userCredential.user);
                    alert("Signup Successful!");
                    window.location.href = "/login"; // Redirect to login page
                })
                .catch((error) => {
                    console.error("Signup Error:", error.message);
                    alert(error.message);
                });
        });
    }
});
