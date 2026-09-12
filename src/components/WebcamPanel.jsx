import { Mic, Video } from "lucide-react";
import { theme } from "../theme";
import HandTracker from "./HandTracker"; // partner's component — not modified, used as-is

/**
 * HandTracker renders its own fixed 640x480 <video>+<canvas> pair (that's how
 * the partner built it). We wrap it in our dark rounded frame rather than
 * editing her component. If it ever needs to be responsive, that's a request
 * to her, not an edit we make ourselves.
 */
export default function WebcamPanel({ tracking, setTracking, onLandmarks }) {
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
        <HandTracker onLandmarks={onLandmarks} />
      ) : (
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Feed paused — press Start Tracking
        </p>
      )}

      <div
        className="absolute top-4 left-4 text-xs font-medium px-2 py-1 rounded-md"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        {tracking ? "Live" : "Paused"}
      </div>

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
