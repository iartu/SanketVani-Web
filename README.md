# SanketVani Web

Real-time ISL (Indian Sign Language) → speech bridge for tele-consultations
and public-service interactions.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in Firebase project credentials
   (ask the team for these — they are not committed to the repo).
3. `npm run dev`, open the printed localhost URL.

No login/auth — the app is intentionally session-based. See pitch notes for
why (walk-up public use case, not a personal account app).

## Project structure

```
src/
├── main.jsx                 entry point
├── App.jsx                  wires everything together — see "Integration" below
├── theme.js                 all colors in one place
├── data/
│   ├── emergencyCards.js    manual-tap emergency phrases
│   └── languages.js         TTS language options
├── hooks/
│   ├── useSpeechSynthesis.js   TTS wrapper
│   ├── useLiveCaptions.js      STT for live captions
│   └── useTranscript.js        session log + .txt export
├── components/                 UI layer (built by Person A)
│   ├── TopBar.jsx
│   ├── WebcamPanel.jsx          wraps HandTracker in the app's frame
│   ├── SessionPanel.jsx
│   ├── LastGesture.jsx
│   ├── LiveCaptions.jsx
│   ├── EmergencyCards.jsx
│   ├── TranscriptLog.jsx
│   └── HandTracker.jsx          AI/ML side — video + MediaPipe overlay
├── logic/                       AI/ML side, copied in as-is
│   ├── gestureRules.js          landmark -> gesture name
│   ├── gestureHoldTimer.js      1s hold-to-confirm logic
│   ├── gestureEngine.js         orchestrates the above + Firestore save
│   └── modeManager.js           MODES: mode -> label + gesture -> phrase
└── services/                    AI/ML side, copied in as-is
    ├── firebaseConfig.js        reads credentials from .env (not hardcoded)
    └── sessionService.js        writes each confirmed gesture to Firestore
```

Files under `logic/` and `services/`, plus `components/HandTracker.jsx`, are
owned by the AI/ML side of the team and copied in verbatim — if something in
there needs to change, that's a request to whoever owns that file, not a
direct edit.

## How it actually fits together

`HandTracker` (video + MediaPipe) detects hand landmarks on every frame and
calls the `onLandmarks` prop it's given. In `App.jsx`, that prop is wired to:

```js
processLandmarks(landmarks, mode, (phraseText) => {
  speak(phraseText, language);
  logToTranscript(phraseText, "Gesture");
});
```

`processLandmarks` (in `gestureEngine.js`) does the gesture detection, the
1-second hold-to-confirm check, and the Firestore session save internally.
It only calls back once a gesture is confirmed, and hands over the **final
phrase text** — not a raw gesture ID — since the mode → phrase lookup
(`modeManager.js`) already happened on that side.

There is no confidence score in this pipeline — `gestureRules.js` returns a
plain gesture name or `null`, nothing probabilistic. `LastGesture.jsx`
reflects that: it shows a "Detected" confirmation, not a percentage.

Session history is written to Firestore automatically inside
`processLandmarks` — no separate integration needed for that. The in-app
Transcript panel (`useTranscript.js`) is a separate, local-only list for the
live UI, not the same thing as the Firestore log.

## Emergency Quick Actions

Independent of gesture detection entirely — tapping a card calls `speak()`
directly. This is deliberate: emergencies should still work even if hand
tracking is struggling or the camera angle is bad.

## Security note

Firebase credentials live in `.env` (gitignored), not hardcoded in
`firebaseConfig.js`, so no real API key is committed to this public repo.

## Tech stack

React + Vite + Tailwind CSS, lucide-react icons, browser-native
`SpeechSynthesis` / `SpeechRecognition`, MediaPipe Hands, Firebase Firestore.
