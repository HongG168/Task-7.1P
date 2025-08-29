import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGvgXYQFnUcn2lu1N7dEW3p-atjkmyV8M",
    authDomain: "devdeakin-6c37a.firebaseapp.com",
    projectId: "devdeakin-6c37a",
    storageBucket: "devdeakin-6c37a.firebasestorage.app",
    messagingSenderId: "984905939912",
    appId: "1:984905939912:web:515990f6357188a36a5efd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
