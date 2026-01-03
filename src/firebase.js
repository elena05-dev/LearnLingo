//* eslint-disable react-refresh/only-export-components */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5CV9AMX1LOp7-pxsVzBwf4KwllEMwy_I",
  authDomain: "learnlingo-fe38e.firebaseapp.com",
  databaseURL: "https://learnlingo-fe38e-default-rtdb.firebaseio.com",
  projectId: "learnlingo-fe38e",
  storageBucket: "learnlingo-fe38e.firebasestorage.app",
  messagingSenderId: "1089393549552",
  appId: "1:1089393549552:web:14abe21e47d8a841582235",
  measurementId: "G-FJB5ZJLZGC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
