import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { theme } from "../theme";

const GESTURES = [
  { pose: "Closed Fist", meaning: "Emergency" },
  { pose: "Open Palm (fingers spread)", meaning: "Where is the counter/station?" },
  { pose: "Index Finger Only", meaning: "I need help / I am in pain" },
  { pose: "Thumbs Up", meaning: "Yes" },
  { pose: "Peace Sign (index + middle)", meaning: "No" },
  { pose: "Pinky Finger Only", meaning: "Thank You" },
  { pose: "Flat Palm (fingers together)", meaning: "Please wait" },
];

export default function GestureLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${theme.panelBorder}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium"
        style={{ background: theme.panel, color: theme.textPrimary }}
      >
        <span className="flex items-center gap-2">
          <HelpCircle size={16} style={{ color: theme.accent }} />
          What do the hand signs mean?
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="px-3 py-2 space-y-2" style={{ background: theme.bg }}>
          {GESTURES.map((g) => (
            <div key={g.pose} className="flex items-start justify-between gap-3 text-xs py-1">
              <span className="font-medium shrink-0" style={{ color: theme.accent, minWidth: "150px" }}>
                {g.pose}
              </span>
              <span className="text-right" style={{ color: theme.textMuted }}>
                {g.meaning}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}