import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { theme } from "../theme";
import { commonPhrases } from "../data/commonPhrases";

export default function CommonPhrases({ onTap }) {
  const [name, setName] = useState("");

  const handleTap = (phrase) => {
    // Pass the raw template + name separately — translation happens on the
    // template ("My name is {name}.") BEFORE substitution, so the {name}
    // placeholder still matches the translation dictionary key exactly.
    onTap(phrase.text, phrase.needsName ? name || "friend" : null);
  };

  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Common Phrases
      </p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (for 'My name is...')"
        className="w-full mb-2 text-sm px-3 py-1.5 rounded-md"
        style={{ background: theme.bg, border: `1px solid ${theme.panelBorder}`, color: theme.textPrimary }}
      />

      <div className="grid grid-cols-2 gap-2">
        {commonPhrases.map((phrase) => (
          <button
            key={phrase.id}
            onClick={() => handleTap(phrase)}
            className="flex items-center gap-1.5 rounded-lg py-2 px-2.5 text-xs font-medium text-left"
            style={{ background: theme.accentSoft, color: theme.accent }}
          >
            <MessageCircle size={14} className="shrink-0" />
            {phrase.label}
          </button>
        ))}
      </div>
    </div>
  );
}
