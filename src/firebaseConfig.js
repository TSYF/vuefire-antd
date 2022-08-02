// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAnV0HBjZHMuT5SMEryWImjFnE4LYniJ3U",
	authDomain: "vuefire-vite.firebaseapp.com",
	projectId: "vuefire-vite",
	storageBucket: "vuefire-vite.appspot.com",
	messagingSenderId: "939432414821",
	appId: "1:939432414821:web:f46728d785f6cccd47c08c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
