import { theme } from "../theme";

export default function ViewerToggle({ viewerMode, setViewerMode }) {
  const options = [
    { id: "deaf", label: "I'm Deaf / Mute" },
    { id: "hearing", label: "I'm Hearing" },
  ];

  return (
    <div className="flex gap-2 mb-1">
      {options.map((opt) => {
        const active = viewerMode === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setViewerMode(opt.id)}
            className="flex-1 text-xs font-medium py-1.5 rounded-md"
            style={{
              background: active ? theme.accent : theme.bg,
              color: active ? "#0B0D0F" : theme.textMuted,
              border: `1px solid ${active ? theme.accent : theme.panelBorder}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
