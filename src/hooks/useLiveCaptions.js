import { useState, useRef, useCallback } from "react";

// onCaption(text) is called every time a new caption arrives, IN ADDITION
// to updating the local `captions` list used for on-screen display. This is
// what lets the shared transcript (and therefore Export) include what the
// hearing person said, not just gestures/emergency/phrase taps.
export function useLiveCaptions(onCaption) {
  const [captions, setCaptions] = useState([]);
  const recognitionRef = useRef(null);
  const shouldBeListeningRef = useRef(false);

  const addCaption = useCallback(
    (text) => {
      setCaptions((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
      if (onCaption) onCaption(text);
    },
    [onCaption]
  );

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser. Try Chrome.");
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
      if (shouldBeListeningRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (event) => {
      console.warn("SpeechRecognition error:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [addCaption]);

  const stopListening = useCallback(() => {
    shouldBeListeningRef.current = false;
    recognitionRef.current?.stop();
  }, []);

  const simulateIncomingSpeech = (text) => addCaption(text);

  return { captions, startListening, stopListening, simulateIncomingSpeech };
}
