import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBfXmj_eToviOMbOzISZA8KfXb52vxbNsg",

  authDomain: "wedding-rsvp-54519.firebaseapp.com",

  projectId: "wedding-rsvp-54519",

  storageBucket: "wedding-rsvp-54519.firebasestorage.app",

  messagingSenderId: "708319765022",

  appId: "1:708319765022:web:1435c780e90275deebc40f"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;

window.fb = {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    onSnapshot
};