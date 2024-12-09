// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// Firebase configuration
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
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };