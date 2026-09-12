function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const wrist = landmarks[0];
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  const margin = 0.02;
  return distance(tip, wrist) > distance(pip, wrist) + margin;
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
  const allExtended = indexExt && middleExt && ringExt && pinkyExt;

  const gap1 = distance(landmarks[8], landmarks[12]);
  const gap2 = distance(landmarks[12], landmarks[16]);
  const gap3 = distance(landmarks[16], landmarks[20]);
  const fingersSpread = gap1 >= 0.05 || gap2 >= 0.05 || gap3 >= 0.05;

  return allExtended && fingersSpread;
}

function isEmergencyGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return !indexExt && !middleExt && !ringExt && !pinkyExt;
}

function isYesGesture(landmarks) {
  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const thumbAboveWrist = thumbTip.y < wrist.y - 0.1;
  const thumbHighestOfAll =
    thumbTip.y < indexTip.y - 0.05 &&
    thumbTip.y < middleTip.y - 0.05 &&
    thumbTip.y < ringTip.y - 0.05 &&
    thumbTip.y < pinkyTip.y - 0.05;

  return thumbAboveWrist && thumbHighestOfAll;
}

function isWaitGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  const allExtended = indexExt && middleExt && ringExt && pinkyExt;

  const gap1 = distance(landmarks[8], landmarks[12]);
  const gap2 = distance(landmarks[12], landmarks[16]);
  const gap3 = distance(landmarks[16], landmarks[20]);
  const fingersTogether = gap1 < 0.05 && gap2 < 0.05 && gap3 < 0.05;

  return allExtended && fingersTogether;
}

function isNoGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return indexExt && middleExt && !ringExt && !pinkyExt;
}

function isThankYouGesture(landmarks) {
  const indexExt = isFingerExtended(landmarks, 8, 6);
  const middleExt = isFingerExtended(landmarks, 12, 10);
  const ringExt = isFingerExtended(landmarks, 16, 14);
  const pinkyExt = isFingerExtended(landmarks, 20, 18);
  return !indexExt && !middleExt && !ringExt && pinkyExt;
}

// NEW — human-readable labels for the live confidence readout
const GESTURE_LABELS = {
  emergency: "Fist (Emergency)",
  yes: "Thumbs Up (Yes)",
  no: "Peace Sign (No)",
  thankYou: "Pinky (Thank You)",
  wait: "Flat Palm (Wait)",
  counter: "Open Palm (Counter)",
  doctor: "Point (Doctor)",
};

// NEW — computes a 0–100 confidence score for whichever gesture matched,
// based on how far past its threshold the pose actually is. This isn't a
// trained model's probability output — it's a transparent geometric
// "how clearly does this pose match" score, computed from the same
// landmark distances the detector already uses.
function computeConfidence(gestureType, landmarks) {
  const wrist = landmarks[0];

  const fingerMargin = (tipIndex, pipIndex) => {
    const tip = landmarks[tipIndex];
    const pip = landmarks[pipIndex];
    return distance(tip, wrist) - distance(pip, wrist); // + = extended, - = curled
  };

  const indexM = fingerMargin(8, 6);
  const middleM = fingerMargin(12, 10);
  const ringM = fingerMargin(16, 14);
  const pinkyM = fingerMargin(20, 18);

  let score;
  switch (gestureType) {
    case "emergency":
      // Confidence = how curled the LEAST-curled finger is (weakest link)
      score = -Math.max(indexM, middleM, ringM, pinkyM);
      return clampToPercent(score, 0, 0.08);

    case "doctor":
      // Confidence = index extension margin, penalized if others aren't curled enough
      score = indexM - Math.max(middleM, ringM, pinkyM);
      return clampToPercent(score, 0, 0.1);

    case "counter": {
      const gap1 = distance(landmarks[8], landmarks[12]);
      const gap2 = distance(landmarks[12], landmarks[16]);
      const gap3 = distance(landmarks[16], landmarks[20]);
      score = Math.min(gap1, gap2, gap3);
      return clampToPercent(score, 0.05, 0.12);
    }

    case "wait": {
      const gap1 = distance(landmarks[8], landmarks[12]);
      const gap2 = distance(landmarks[12], landmarks[16]);
      const gap3 = distance(landmarks[16], landmarks[20]);
      score = 0.05 - Math.max(gap1, gap2, gap3);
      return clampToPercent(score, 0, 0.05);
    }

    case "yes": {
      const thumbTip = landmarks[4];
      const tips = [landmarks[8], landmarks[12], landmarks[16], landmarks[20]];
      const minGap = Math.min(...tips.map((t) => t.y - thumbTip.y));
      return clampToPercent(minGap, 0.05, 0.2);
    }

    case "no":
      score = Math.min(indexM, middleM) - Math.max(ringM, pinkyM);
      return clampToPercent(score, 0, 0.1);

    case "thankYou":
      score = pinkyM - Math.max(indexM, middleM, ringM);
      return clampToPercent(score, 0, 0.1);

    default:
      return 0;
  }
}

// Maps a raw score onto a 0–100% range given expected min/max bounds
function clampToPercent(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return Math.round(Math.max(0, Math.min(100, pct)));
}

// Order matters: most distinctive/reliable signals checked first
export function detectGesture(landmarks) {
  let type = null;
  if (isYesGesture(landmarks)) type = "yes";
  else if (isEmergencyGesture(landmarks)) type = "emergency";
  else if (isThankYouGesture(landmarks)) type = "thankYou";
  else if (isNoGesture(landmarks)) type = "no";
  else if (isWaitGesture(landmarks)) type = "wait";
  else if (isCounterGesture(landmarks)) type = "counter";
  else if (isDoctorGesture(landmarks)) type = "doctor";

  if (!type) return { type: null, label: null, confidence: 0 };

  return {
    type,
    label: GESTURE_LABELS[type],
    confidence: computeConfidence(type, landmarks),
  };
}