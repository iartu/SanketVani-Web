export const MODES = {
  hospital: {
    label: "Hospital Mode",
    gestures: {
      emergency: "Need doctor immediately",
      counter: "Where is the reception?",
      doctor: "I am in pain",
      yes: "Yes",
      no: "No",
      thankYou: "Thank you",
      wait: "Please wait a moment",
    },
  },
  transport: {
    label: "Transport Mode",
    gestures: {
      emergency: "This is an emergency",
      counter: "Where is the ticket counter?",
      doctor: "I need help",
      yes: "Yes",
      no: "No",
      thankYou: "Thank you",
      wait: "Please wait",
    },
  },
  police: {
    label: "Police Mode",
    gestures: {
      emergency: "I need urgent help",
      counter: "Where is the police station?",
      doctor: "I have been hurt",
      yes: "Yes",
      no: "No",
      thankYou: "Thank you",
      wait: "Please wait a moment",
    },
  },
};

export const DEFAULT_MODE = "hospital";