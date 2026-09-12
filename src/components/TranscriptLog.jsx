import { theme } from "../theme";

export default function TranscriptLog({ transcript }) {
  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Transcript
      </p>
      <div className="space-y-1 text-sm">
        {transcript.length === 0 ? (
          <p style={{ color: theme.textMuted }}>Nothing logged yet this session.</p>
        ) : (
          transcript.map((t, i) => (
            <div key={i} className="flex gap-2">
              <span style={{ color: theme.textMuted }} className="shrink-0">
                {t.time}
              </span>
              <span
                className="text-xs font-semibold shrink-0"
                style={{
                  color:
                    t.source === "Emergency" ? theme.danger : t.source === "Caption" ? theme.success : theme.accent,
                }}
              >
                {t.source}:
              </span>
              <span>{t.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
