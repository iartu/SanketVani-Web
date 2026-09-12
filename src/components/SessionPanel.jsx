import { Download } from "lucide-react";
import { theme } from "../theme";
import ViewerToggle from "./ViewerToggle";
import LiveCaptions from "./LiveCaptions";
import GestureCaptions from "./GestureCaptions";
import EmergencyCards from "./EmergencyCards";
import CommonPhrases from "./CommonPhrases";
import TranscriptLog from "./TranscriptLog";
import GestureLegend from "./GestureLegend";

export default function SessionPanel({
  viewerMode,
  setViewerMode,
  captions,
  transcript,
  onEmergencyTap,
  onCommonPhraseTap,
  onExport,
}) {
  return (
    <div
      className="md:col-span-2 flex flex-col rounded-2xl overflow-hidden min-h-0"
      style={{ background: theme.panel, border: `1px solid ${theme.panelBorder}` }}
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: theme.panelBorder }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Session Panel</span>
          <button onClick={onExport} className="flex items-center gap-1 text-xs font-medium" style={{ color: theme.accent }}>
            <Download size={13} /> Export
          </button>
        </div>
        <ViewerToggle viewerMode={viewerMode} setViewerMode={setViewerMode} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-0">
        {/* NEW — collapsible reference guide, especially useful for the
            hearing person seeing gestures for the first time */}
        <GestureLegend />

        {viewerMode === "deaf" ? (
          <LiveCaptions captions={captions} />
        ) : (
          <GestureCaptions transcript={transcript} />
        )}
        <EmergencyCards onTap={onEmergencyTap} />
        <CommonPhrases onTap={onCommonPhraseTap} />
        <TranscriptLog transcript={transcript} />
      </div>
    </div>
  );
}