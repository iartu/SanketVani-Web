import { theme } from "../theme";

export default function LiveCaptions({ captions }) {
  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Live Captions
      </p>
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
