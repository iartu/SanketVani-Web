import { useState } from "react";
import { Send } from "lucide-react";
import { theme } from "../theme";

// Shown to the hearing person: a feed of what the deaf/mute person has
// signed/tapped, PLUS a manual input for the hearing person to type what
// THEY just said, as a fallback when mic-based captions can't reach their
// speech-recognition service (network-blocked venue, etc). Whoever is
// looking at this screen is the one who'd realistically type it in.
export default function GestureCaptions({ transcript, onManualCaption }) {
  const [manualText, setManualText] = useState("");

  const handleManualSubmit = () => {
    const trimmed = manualText.trim();
    if (!trimmed) return;
    onManualCaption(trimmed);
    setManualText("");
  };

  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Gesture Captions
      </p>
      <div className="space-y-2 mb-3">
        {transcript.length === 0 ? (
          <p className="text-sm" style={{ color: theme.textMuted }}>
            What the other person signs or taps will appear here as text.
          </p>
        ) : (
          transcript.map((t, i) => (
            <div
              key={i}
              className="rounded-lg px-3 py-2 text-sm max-w-[90%]"
              style={{ background: theme.bg, border: `1px solid ${theme.panelBorder}` }}
            >
              {t.text}
            </div>
          ))
        )}
      </div>

      {onManualCaption && (
        <>
          <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
            Type what you're saying
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
              placeholder="If mic captions aren't working, type here..."
              className="flex-1 text-sm px-3 py-1.5 rounded-md"
              style={{ background: theme.bg, border: `1px solid ${theme.panelBorder}`, color: theme.textPrimary }}
            />
            <button
              onClick={handleManualSubmit}
              className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ background: theme.accentSoft, color: theme.accent }}
            >
              <Send size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
