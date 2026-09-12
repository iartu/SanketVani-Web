import { useState } from "react";
import { Mic, Video, Volume2, HandMetal } from "lucide-react";
import { theme } from "../theme";
import HandTracker from "./HandTracker";

export default function WebcamPanel({ tracking, setTracking, onLandmarks, isSpeaking, liveDetection }) {
  const [handDetected, setHandDetected] = useState(true);

  return (
    <div
      className="relative flex-1 rounded-2xl overflow-hidden flex items-center justify-center min-h-[380px]"
      style={{
        background: "#000",
        border: tracking ? `2px solid ${theme.success}` : `2px solid ${theme.panelBorder}`,
        boxShadow: tracking ? `0 0 0 4px rgba(79,209,165,0.12)` : "none",
        transition: "box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      {tracking ? (
        <HandTracker onLandmarks={onLandmarks} onHandStatusChange={setHandDetected} />
      ) : (
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Feed paused — press Start Tracking
        </p>
      )}

      {tracking && !handDetected && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div
            className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl"
            style={{ background: "rgba(20,22,25,0.9)", border: `2px solid ${theme.accent}` }}
          >
            <HandMetal size={32} style={{ color: theme.accent }} />
            <p className="text-base font-semibold text-center" style={{ color: theme.textPrimary }}>
              Show your hand to the camera
            </p>
            <p className="text-xs text-center" style={{ color: theme.textMuted }}>
              Make sure your hand is fully visible and well-lit
            </p>
          </div>
        </div>
      )}

      <div
        className="absolute top-4 left-4 text-xs font-medium px-2 py-1 rounded-md"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        {tracking ? "Live" : "Paused"}
      </div>

      {/* Live confidence readout, top-left below the Live/Paused badge */}
      {tracking && liveDetection && liveDetection.type && (
        <div
          className="absolute top-12 left-4 flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${theme.accent}` }}
        >
          <span style={{ color: theme.textPrimary }}>Detecting: {liveDetection.label}</span>
          <span style={{ color: theme.accent, fontWeight: 700 }}>{liveDetection.confidence}%</span>
        </div>
      )}

      {isSpeaking && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full"
          style={{ background: theme.accent, color: "#0B0D0F" }}
        >
          <Volume2 size={13} className="animate-pulse" />
          Speaking...
        </div>
      )}

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full"
        style={{ background: "rgba(20,22,25,0.85)", border: `1px solid ${theme.panelBorder}` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: theme.panel }}>
          <Mic size={15} style={{ color: theme.textMuted }} />
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: theme.panel }}>
          <Video size={15} style={{ color: theme.textMuted }} />
        </div>
        <button
          onClick={() => setTracking((t) => !t)}
          className="px-4 h-9 rounded-full text-sm font-medium"
          style={{ background: tracking ? theme.danger : theme.success, color: "#0B0D0F" }}
        >
          {tracking ? "Stop" : "Start Tracking"}
        </button>
      </div>
    </div>
  );
}