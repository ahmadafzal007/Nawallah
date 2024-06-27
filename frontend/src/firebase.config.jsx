import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore/lite'; // Note the change here

import { getAuth,onAuthStateChanged } from "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  // apiKey: "AIzaSyDLY5dHR92vbuxM2E_zR3BF1Em5TgWlYY0",
  // authDomain: "paraiso-a6ec6.firebaseapp.com",
  // projectId: "paraiso-a6ec6",
  // storageBucket: "paraiso-a6ec6.appspot.com",
  // messagingSenderId: "40632360916",
  // appId: "1:40632360916:web:4bfc5951468edf25478041",
  // measurementId: "G-2JT7C6FPSF"


  apiKey: "AIzaSyBjL3xW1Zac8sg1-44NSgx_dg1NOxQQJDI",
  authDomain: "fypparaiso.firebaseapp.com",
  projectId: "fypparaiso",
  storageBucket: "fypparaiso.appspot.com",
  messagingSenderId: "903437557620",
  appId: "1:903437557620:web:a661136b6adfb8d9dc5621",
  measurementId: "G-HDWMFSRB1S"

};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage,auth };
