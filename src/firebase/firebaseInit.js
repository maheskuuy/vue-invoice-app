import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "AIzaSyC65bD_EedlcfxiWvumR3GYaez1ICW7uDw",
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "invoice-app-38ed4.firebaseapp.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "invoice-app-38ed4",
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "invoice-app-38ed4.firebasestorage.app",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "773853924938",
  appId: process.env.VUE_APP_FIREBASE_APP_ID || "1:773853924938:web:dddd2078c404e8ec9660b3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
