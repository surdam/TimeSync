import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1O6x2bwrE5XepMb_erslHS1nETZt6bgs",
  authDomain: "videosync-8e06b.firebaseapp.com",
  databaseURL: "https://videosync-8e06b-default-rtdb.firebaseio.com",
  projectId: "videosync-8e06b",
  storageBucket: "videosync-8e06b.appspot.com",
  messagingSenderId: "271932096292",
  appId: "1:271932096292:web:fe82aca877567ba2bf3db1",
  measurementId: "G-4YKSNPQ2ZL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
