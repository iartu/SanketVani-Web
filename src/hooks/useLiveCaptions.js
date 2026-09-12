import { useState, useRef, useCallback } from "react";

export function useLiveCaptions() {
  const [captions, setCaptions] = useState([]);
  const recognitionRef = useRef(null);
  const shouldBeListeningRef = useRef(false); // tracks intent, so we know whether to auto-restart

  const addCaption = useCallback((text) => {
    setCaptions((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
  }, []);

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

    // Chrome frequently stops recognition after a pause in speech, even with
    // continuous:true. If we're still supposed to be listening, restart it
    // automatically so captions don't silently die mid-conversation.
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
    shouldBeListeningRef.current = false; // prevents onend from restarting it
    recognitionRef.current?.stop();
  }, []);

  // For demo/testing without a working mic setup
  const simulateIncomingSpeech = (text) => addCaption(text);

  return { captions, startListening, stopListening, simulateIncomingSpeech };
}
