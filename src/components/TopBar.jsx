import { Hand, Settings2, ChevronDown } from "lucide-react";
import { theme } from "../theme";
import { MODES } from "../logic/modeManager"; // partner's file — source of truth for modes/labels
import { LANGUAGES } from "../data/languages";

export default function TopBar({ mode, setMode, language, setLanguage }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: theme.panelBorder }}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: theme.accent }}>
          <Hand size={18} color="#0B0D0F" />
        </div>
        <span className="font-semibold text-lg tracking-tight">SanketVani</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="appearance-none text-sm pl-3 pr-8 py-1.5 rounded-md font-medium cursor-pointer"
            style={{ background: theme.panel, border: `1px solid ${theme.panelBorder}`, color: theme.textPrimary }}
          >
            {Object.keys(MODES).map((modeKey) => (
              <option key={modeKey} value={modeKey}>
                {MODES[modeKey].label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-2.5 pointer-events-none" style={{ color: theme.textMuted }} />
        </div>

        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none text-sm pl-3 pr-8 py-1.5 rounded-md font-medium cursor-pointer"
            style={{ background: theme.panel, border: `1px solid ${theme.panelBorder}`, color: theme.textPrimary }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-2.5 pointer-events-none" style={{ color: theme.textMuted }} />
        </div>

        <button
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: theme.panel, border: `1px solid ${theme.panelBorder}` }}
        >
          <Settings2 size={15} style={{ color: theme.textMuted }} />
        </button>
      </div>
    </header>
  );
}
