// Wraps the browser's native text-to-speech API, with explicit voice
// matching. Two known browser quirks handled here:
// 1. getVoices() often returns [] synchronously right after page load —
//    voices load asynchronously, so we wait for the 'voiceschanged' event.
// 2. Even with the right voice, whether Hindi/Marathi actually sound right
//    depends on what voices are installed on the user's OS/browser — that's
//    a real limitation, not something code can fully paper over.
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
  const speak = async (text, langCode) => {
    if (!window.speechSynthesis) return;

    const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;

    const exactMatch = voices.find((v) => v.lang === langCode);
    const looseMatch = voices.find((v) => v.lang.startsWith(langCode.split("-")[0]));
    const voice = exactMatch || looseMatch;

    if (voice) {
      utter.voice = voice;
    } else if (langCode !== "en-IN") {
      console.warn(
        `No installed voice found for ${langCode}. Falling back to the browser's default voice — ` +
          `this is a browser/OS limitation (missing language pack), not an app bug. ` +
          `Run speechSynthesis.getVoices() in the console to see what's available.`
      );
    }

    window.speechSynthesis.speak(utter);
  };

  return { speak };
}
