// Each mode has its own set of gesture-to-phrase mappings
export const MODES = {
  hospital: {
    label: "Hospital Mode",
    gestures: {
      emergency: "Need doctor immediately",
      counter: "Where is the reception?",
      doctor: "I am in pain",
    },
  },
  transport: {
    label: "Transport Mode",
    gestures: {
      emergency: "This is an emergency",
      counter: "Where is the ticket counter?",
      doctor: "I need help",
    },
  },
  police: {
    label: "Police Mode",
    gestures: {
      emergency: "I need urgent help",
      counter: "Where is the police station?",
      doctor: "I have been hurt",
    },
  },
};

// Default mode when app starts
export const DEFAULT_MODE = "hospital";