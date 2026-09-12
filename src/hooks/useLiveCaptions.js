import { useState, useRef, useCallback } from "react";

const MAX_CONSECUTIVE_FAILURES = 3;
const RESTART_DELAY_MS = 500;

export function useLiveCaptions(onCaption) {
  const [captions, setCaptions] = useState([]);
  const [captionsError, setCaptionsError] = useState(null);
  const recognitionRef = useRef(null);
  const shouldBeListeningRef = useRef(false);
  const failureCountRef = useRef(0);

  const addCaption = useCallback(
    (text) => {
      failureCountRef.current = 0;
      setCaptionsError(null);
      setCaptions((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
      if (onCaption) onCaption(text);
    },
    [onCaption]
  );

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser. Try Chrome.");
      setCaptionsError("unsupported");
      return;
    }

    shouldBeListeningRef.current = true;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript;
      addCaption(text);
    };

    recognition.onend = () => {
      if (!shouldBeListeningRef.current) return;

      if (failureCountRef.current >= MAX_CONSECUTIVE_FAILURES) {
        console.warn(
          `SpeechRecognition failed ${MAX_CONSECUTIVE_FAILURES} times in a row — giving up. Use the manual caption input instead.`
        );
        setCaptionsError("network");
        shouldBeListeningRef.current = false;
        return;
      }

      setTimeout(() => {
        if (shouldBeListeningRef.current) recognition.start();
      }, RESTART_DELAY_MS);
    };

    recognition.onerror = (event) => {
      console.warn("SpeechRecognition error:", event.error);
      if (event.error === "network" || event.error === "aborted" || event.error === "not-allowed") {
        failureCountRef.current += 1;
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [addCaption]);

  const stopListening = useCallback(() => {
    shouldBeListeningRef.current = false;
    failureCountRef.current = 0;
    setCaptionsError(null);
    recognitionRef.current?.stop();
  }, []);

  const simulateIncomingSpeech = (text) => addCaption(text);

  return { captions, captionsError, startListening, stopListening, simulateIncomingSpeech };
}
