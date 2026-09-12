import { useState, useCallback } from "react";

export function useTranscript() {
  const [transcript, setTranscript] = useState([]);

  const logToTranscript = useCallback((text, source) => {
    setTranscript((prev) => [...prev, { text, source, time: new Date().toLocaleTimeString() }]);
  }, []);

  const exportTranscript = () => {
    const content = transcript.map((t) => `[${t.time}] (${t.source}) ${t.text}`).join("\n");
    const blob = new Blob([content || "No transcript yet."], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "session-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return { transcript, logToTranscript, exportTranscript };
}
