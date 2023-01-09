import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp ({
  apiKey: "AIzaSyDraTk7LKCZla0kckSb40jzaOACD08Nc-A",
  authDomain: "baroland-98d8d.firebaseapp.com",
  projectId: "baroland-98d8d",
  storageBucket: "baroland-98d8d.appspot.com",
  messagingSenderId: "445570934747",
  appId: "1:445570934747:web:f4c1abebe389e04c37a9fe"
});

// Initialize Firebase
export const auth = app.auth();
export default app ;