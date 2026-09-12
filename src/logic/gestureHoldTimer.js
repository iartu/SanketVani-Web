let currentGesture = null;
let gestureStartTime = null;
let awaitingRelease = false;
const HOLD_DURATION = 1000;

export function checkHeldGesture(gestureType, onConfirmed, onProgress) {
  if (!gestureType) {
    currentGesture = null;
    gestureStartTime = null;
    awaitingRelease = false;
    if (onProgress) onProgress(0, null);
    return;
  }

  if (awaitingRelease && gestureType === currentGesture) {
    if (onProgress) onProgress(1, gestureType);
    return;
  }

  if (gestureType !== currentGesture) {
    currentGesture = gestureType;
    gestureStartTime = Date.now();
    awaitingRelease = false;
  }

  const elapsed = Date.now() - gestureStartTime;
  const progress = Math.min(elapsed / HOLD_DURATION, 1);

  if (onProgress) onProgress(progress, gestureType);

  if (progress >= 1 && !awaitingRelease) {
    onConfirmed(gestureType);
    awaitingRelease = true;
  }
}