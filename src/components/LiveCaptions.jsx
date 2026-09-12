import { WifiOff } from "lucide-react";
import { theme } from "../theme";

// Read-only for the deaf/mute person — they read what the hearing person
// said here. The manual typing fallback lives on the "I'm Hearing" side
// instead, since the hearing person is the one who needs to type what they
// just said if mic captions fail — not the person reading this feed.
export default function LiveCaptions({ captions, captionsError }) {
  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Live Captions
      </p>

      {captionsError === "network" && (
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs mb-2"
          style={{ background: theme.dangerSoft, color: theme.danger }}
        >
          <WifiOff size={14} className="shrink-0" />
          Mic captions unavailable right now.
        </div>
      )}
      {captionsError === "unsupported" && (
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs mb-2"
          style={{ background: theme.dangerSoft, color: theme.danger }}
        >
          <WifiOff size={14} className="shrink-0" />
          Captions aren't supported in this browser — try Chrome.
        </div>
      )}

      <div className="space-y-2">
        {captions.length === 0 ? (
          <p className="text-sm" style={{ color: theme.textMuted }}>
            What the hearing person says will appear here as captions.
          </p>
        ) : (
          captions.map((c, i) => (
            <div
              key={i}
              className="rounded-lg px-3 py-2 text-sm max-w-[90%]"
              style={{ background: theme.bg, border: `1px solid ${theme.panelBorder}` }}
            >
              {c.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
