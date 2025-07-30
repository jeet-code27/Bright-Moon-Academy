// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyCtyIS9WHuH96dbQsC6jpvUutYqvnBhHpY",
  authDomain: "bright-moon-academy.firebaseapp.com",
  projectId: "bright-moon-academy",
  storageBucket: "bright-moon-academy.firebasestorage.app",
  messagingSenderId: "763194586883",
  appId: "1:763194586883:web:107f4052ea9efd6b8b1b36",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);