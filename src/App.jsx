import { useState, useEffect, useRef, useCallback } from "react";
import { theme } from "./theme";
import TopBar from "./components/TopBar";
import WebcamPanel from "./components/WebcamPanel";
import SessionPanel from "./components/SessionPanel";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useTranscript } from "./hooks/useTranscript";
import { useLiveCaptions } from "./hooks/useLiveCaptions";
import { translate } from "./data/translations";
import { processLandmarks } from "./logic/gestureEngine";
import { DEFAULT_MODE } from "./logic/modeManager";

export default function App() {
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [language, setLanguage] = useState("en-IN");
  const [tracking, setTracking] = useState(false);
  const [viewerMode, setViewerMode] = useState("deaf");
  const [liveDetection, setLiveDetection] = useState({ type: null, label: null, confidence: 0 });
  const [handDetected, setHandDetected] = useState(true);

  const modeRef = useRef(mode);
  const languageRef = useRef(language);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const { speak, isSpeaking } = useSpeechSynthesis();
  const { transcript, logToTranscript, exportTranscript } = useTranscript();

  const handleCaption = useCallback(
    (text) => {
      logToTranscript(text, "Caption");
    },
    [logToTranscript]
  );

  const { captions, captionsError, startListening, stopListening, simulateIncomingSpeech } = useLiveCaptions(
    handleCaption
  );
  
  useEffect(() => {
    if (tracking) {
      startListening();
    } else {
      stopListening();
    }
    return () => stopListening();
  }, [tracking, startListening, stopListening]);

  const handleLandmarks = useCallback(
    (landmarks) => {
      processLandmarks(
        landmarks,
        modeRef.current,
        (phraseText) => {
          speak(translate(phraseText, languageRef.current), languageRef.current);
          logToTranscript(phraseText, "Gesture");
        },
        undefined,
        (result) => setLiveDetection(result)
      );
    },
    [speak, logToTranscript]
  );

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

  // Manual typed caption — lives on the "I'm Hearing" screen now, since the
  // hearing person is who'd realistically type what they just said.
  const handleManualCaption = (text) => {
    simulateIncomingSpeech(text);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ background: theme.bg, color: theme.textPrimary }}>
      <TopBar mode={mode} setMode={setMode} language={language} setLanguage={setLanguage} />

      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-4 p-4 md:p-6">
        <div className="md:col-span-3 flex flex-col gap-3 min-h-0">
          <WebcamPanel
            tracking={tracking}
            setTracking={setTracking}
            onLandmarks={handleLandmarks}
            isSpeaking={isSpeaking}
            liveDetection={liveDetection}
            viewerMode={viewerMode}
            handDetected={handDetected}
            setHandDetected={setHandDetected}
          />
        </div>

        <SessionPanel
          viewerMode={viewerMode}
          setViewerMode={setViewerMode}
          captions={captions}
          captionsError={captionsError}
          transcript={transcript}
          onEmergencyTap={handleEmergencyTap}
          onCommonPhraseTap={handleCommonPhraseTap}
          onManualCaption={handleManualCaption}
          onExport={exportTranscript}
        />
      </main>
    </div>
  );
}
