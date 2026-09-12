import { detectGesture } from "./gestureRules";
import { checkHeldGesture } from "./gestureHoldTimer";
import { saveSession } from "../services/sessionService";
import { MODES } from "./modeManager";

// detectGesture now returns { type, label, confidence } instead of a plain
// string — result.type is what gets passed to the hold-timer, and the full
// result object is passed to onLiveDetection for the UI's live badge.
export function processLandmarks(landmarks, currentMode, onGestureConfirmed, onProgress, onLiveDetection) {
  const result = detectGesture(landmarks); // { type, label, confidence }

  if (onLiveDetection) onLiveDetection(result);

  checkHeldGesture(
    result.type,
    (confirmedType) => {
      const phraseText = MODES[currentMode].gestures[confirmedType];
      saveSession(phraseText, currentMode);
      onGestureConfirmed(phraseText);
    },
    onProgress
  );
}