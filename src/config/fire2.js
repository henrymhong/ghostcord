import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");

const config = {
	apiKey: "AIzaSyA6QrYzHLTEgkdEBG6V95cHrosAjhBJ_Iw",
	authDomain: "web-chat-73c3d.firebaseapp.com",
	databaseURL: "https://web-chat-73c3d.firebaseio.com",
	projectId: "web-chat-73c3d",
	storageBucket: "web-chat-73c3d.appspot.com",
	messagingSenderId: "430450594876",
	appId: "1:430450594876:web:7768f63337cd77303adf39"
};

const fire = firebase.initializeApp(config);
export const db = firebase.storage();

export default fire;
