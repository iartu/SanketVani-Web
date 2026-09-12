let currentGesture = null;
let gestureStartTime = null;
const HOLD_DURATION = 1000; // 1 second

export function checkHeldGesture(gesture, onConfirmed) {
  if (!gesture) {
    currentGesture = null;
    gestureStartTime = null;
    return;
  }

  if (gesture !== currentGesture) {
    currentGesture = gesture;
    gestureStartTime = Date.now();
  } else {
    const elapsed = Date.now() - gestureStartTime;
    if (elapsed >= HOLD_DURATION) {
      onConfirmed(gesture);
      currentGesture = null; // reset so it doesn't fire repeatedly
      gestureStartTime = null;
    }
  }
}