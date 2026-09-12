import { theme } from "../theme";

export default function GestureCaptions({ transcript }) {
  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Gesture Captions
      </p>
      <div className="space-y-2">
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
    </div>
  );
}
