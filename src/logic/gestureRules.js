function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

// Is a finger "extended" — tip is farther from wrist than its middle knuckle is
function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const wrist = landmarks[0];
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return distance(tip, wrist) > distance(pip, wrist);
}

function isDoctorGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return indexExt && !middleExt && !ringExt && !pinkyExt;
}

function isCounterGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return indexExt && middleExt && ringExt && pinkyExt;
}

// Gesture 3: "Emergency" — CLOSED FIST, all fingers curled down
function isEmergencyGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return !indexExt && !middleExt && !ringExt && !pinkyExt;
}

export function detectGesture(landmarks) {
  if (isEmergencyGesture(landmarks)) return "emergency";
  if (isCounterGesture(landmarks)) return "counter";
  if (isDoctorGesture(landmarks)) return "doctor";
  return null;
}