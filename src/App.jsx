import { useState, useEffect } from "react";
import { theme } from "./theme";
import TopBar from "./components/TopBar";
import WebcamPanel from "./components/WebcamPanel";
import SessionPanel from "./components/SessionPanel";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useTranscript } from "./hooks/useTranscript";
import { useLiveCaptions } from "./hooks/useLiveCaptions";
import { translate } from "./data/translations";
import { processLandmarks } from "./logic/gestureEngine"; // partner's file — not modified
import { DEFAULT_MODE } from "./logic/modeManager"; // partner's file — not modified

export default function App() {
  const [mode, setMode] = useState(DEFAULT_MODE); // e.g. "hospital" — matches her MODES keys exactly
  const [language, setLanguage] = useState("en-IN");
  const [tracking, setTracking] = useState(false);
  const [viewerMode, setViewerMode] = useState("deaf"); // "deaf" | "hearing" — who's reading the screen right now

  const { speak } = useSpeechSynthesis();
  const { transcript, logToTranscript, exportTranscript } = useTranscript();
  const { captions, startListening, stopListening } = useLiveCaptions();

  // Mic listening (for live captions) starts/stops together with hand
  // tracking — "Start Tracking" is the moment the app goes "live" for a
  // conversation, so both halves of the conversation turn on together.
  useEffect(() => {
    if (tracking) {
      startListening();
    } else {
      stopListening();
    }
    return () => stopListening();
  }, [tracking, startListening, stopListening]);

  // This is what HandTracker's onLandmarks prop calls on every frame.
  // processLandmarks (her code) handles detection + 1s hold + Firestore
  // logging internally, and only fires this callback once a gesture is
  // confirmed — with the final phrase text already resolved.
  const handleLandmarks = (landmarks) => {
    processLandmarks(landmarks, mode, (phraseText) => {
      speak(translate(phraseText, language), language);
      logToTranscript(phraseText, "Gesture"); // feeds the Gesture Captions view (hearing mode)
      // Note: she already calls saveSession() inside processLandmarks,
      // so this gesture is also being written to Firestore automatically.
    });
  };

  const handleEmergencyTap = (card) => {
    speak(translate(card.text, language), language);
    logToTranscript(card.text, "Emergency");
  };

  const handleCommonPhraseTap = (template, name) => {
    const translatedTemplate = translate(template, language);
    const finalText = name ? translatedTemplate.replace("{name}", name) : translatedTemplate;
    speak(finalText, language);
    logToTranscript(name ? template.replace("{name}", name) : template, "Phrase");
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ background: theme.bg, color: theme.textPrimary }}>
      <TopBar mode={mode} setMode={setMode} language={language} setLanguage={setLanguage} />

      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-4 p-4 md:p-6">
        <div className="md:col-span-3 flex flex-col gap-3 min-h-0">
          <WebcamPanel tracking={tracking} setTracking={setTracking} onLandmarks={handleLandmarks} />
        </div>

        <SessionPanel
          viewerMode={viewerMode}
          setViewerMode={setViewerMode}
          captions={captions}
          transcript={transcript}
          onEmergencyTap={handleEmergencyTap}
          onCommonPhraseTap={handleCommonPhraseTap}
          onExport={exportTranscript}
        />
      </main>
    </div>
  );
}
