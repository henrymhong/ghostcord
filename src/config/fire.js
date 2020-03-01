import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");

export const config = {
  apiKey: "AIzaSyDcV9Cx0s8KB7YbMn840t-6elwgRXZ2O4U",
  authDomain: "testing-458fc.firebaseapp.com",
  databaseURL: "https://testing-458fc.firebaseio.com",
  projectId: "testing-458fc",
  storageBucket: "testing-458fc.appspot.com",
  messagingSenderId: "494214252130",
  appId: "1:494214252130:web:4bf8290ef955ffc692f33b"
};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default fire;
