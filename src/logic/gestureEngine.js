import { detectGesture } from "./gestureRules";
import { checkHeldGesture } from "./gestureHoldTimer";
import { saveSession } from "../services/sessionService";
import { MODES } from "./modeManager";

// This is the function Person A imports and calls
export function processLandmarks(landmarks, currentMode, onGestureConfirmed) {
  const gestureType = detectGesture(landmarks);

  checkHeldGesture(gestureType, (confirmedType) => {
    const phraseText = MODES[currentMode].gestures[confirmedType];
    saveSession(phraseText, currentMode);
    onGestureConfirmed(phraseText); // <-- Person A's callback fires here
  });
}