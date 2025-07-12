// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi4gwpnDneMcyuqFyGEXaDvMKsa-EsTB8",
  authDomain: "vcity01-fa491.firebaseapp.com",
  projectId: "vcity01-fa491",
  storageBucket: "vcity01-fa491.firebasestorage.app", // fixed here
  messagingSenderId: "82968031109",
  appId: "1:82968031109:web:706a7f9c40525fe07e9eec",
  measurementId: "G-43D0FL3FR4",
};

// Initialize Firebase app or reuse existing
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase Storage (safe on server and client)
export const storage = getStorage(app);

// Analytics: initialize only on client, dynamically imported
let analytics = null;

if (typeof window !== "undefined") {
  // Dynamic import to avoid SSR issues and timing problems
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
    })
    .catch((err) => {
      console.warn("Firebase analytics failed to initialize:", err);
    });
}

export { analytics };