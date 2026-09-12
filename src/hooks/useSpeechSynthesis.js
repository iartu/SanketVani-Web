import { useState, useRef, useCallback } from "react";

let cachedVoices = [];
let voicesLoadedPromise = null;

function loadVoices() {
  if (voicesLoadedPromise) return voicesLoadedPromise;

  voicesLoadedPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis?.getVoices() || [];
    if (existing.length > 0) {
      cachedVoices = existing;
      resolve(existing);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
  });

  return voicesLoadedPromise;
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentUtteranceRef = useRef(null);

  const speak = useCallback(async (text, langCode) => {
    if (!window.speechSynthesis) return;

    const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();

    const exactMatch = voices.find((v) => v.lang === langCode);
    const looseMatch = voices.find((v) => v.lang.startsWith(langCode.split("-")[0]));
    const voice = exactMatch || looseMatch;

    if (!voice && langCode !== "en-IN") {
      console.warn(
        `No installed voice found for ${langCode}. Falling back to the browser's default voice.`
      );
    }

    window.speechSynthesis.cancel();

    // NEW — Chrome has a known bug where speak() called immediately after
    // cancel() can silently fail to produce audio, especially when the new
    // utterance uses a different voice/language than whatever was just
    // cancelled. A tiny delay lets Chrome fully reset before speaking again.
    setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = langCode;
      if (voice) utter.voice = voice;

      currentUtteranceRef.current = utter;

      utter.onstart = () => {
        setIsSpeaking(true);
      };

      utter.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      utter.onerror = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      window.speechSynthesis.speak(utter);
    }, 100); // 100ms is enough for Chrome to reset; imperceptible to the user
  }, []);

  return { speak, isSpeaking };
}