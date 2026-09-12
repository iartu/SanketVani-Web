import { theme } from "../theme";
import { emergencyCards } from "../data/emergencyCards";

export default function EmergencyCards({ onTap }) {
  return (
    <div>
      <p className="text-[11px] font-medium mb-2 uppercase tracking-wide" style={{ color: theme.textMuted }}>
        Emergency Quick Actions
      </p>
      <div className="grid grid-cols-3 gap-2">
        {emergencyCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onTap(card)}
              className="flex flex-col items-center justify-center gap-1.5 rounded-lg py-3 px-2 text-[11px] font-medium"
              style={{ background: theme.dangerSoft, color: theme.danger }}
            >
              <Icon size={20} />
              {card.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
