import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveSession(gestureText, mode = "general") {
  try {
    await addDoc(collection(db, "sessions"), {
      gesture: gestureText,
      mode: mode,
      timestamp: serverTimestamp(),
    });
    console.log("Session saved:", gestureText);
  } catch (error) {
    console.error("Error saving session:", error);
  }
}