// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDy5H33Zy97X2m3agx4bqgpPKvlQidIFqQ",
  authDomain: "kagenikki-1f2e8.firebaseapp.com",
  databaseURL: "https://kagenikki-1f2e8-default-rtdb.firebaseio.com",
  projectId: "kagenikki-1f2e8",
  storageBucket: "kagenikki-1f2e8.firebasestorage.app",
  messagingSenderId: "918421884729",
  appId: "1:918421884729:web:a4296efc1ddc9799fa62e8",
  measurementId: "G-TWNVVWY31T"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// try to enable offline persistence (may fail on multiple tabs)
try{ enableIndexedDbPersistence(db).catch(()=>console.warn('IndexedDB persistence not available')); }catch(e){console.warn('persistence error', e)}
