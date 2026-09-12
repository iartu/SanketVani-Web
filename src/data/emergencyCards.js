import { Droplet, Siren, AlertTriangle, Wind, Armchair, ShieldAlert } from "lucide-react";

// Manually tapped, not gesture-triggered — always works even if tracking fails.
export const emergencyCards = [
  { id: "WATER", label: "Need Water", text: "I need water, please.", icon: Droplet },
  { id: "AMBULANCE", label: "Call Ambulance", text: "Please call an ambulance immediately.", icon: Siren },
  { id: "PAIN", label: "Severe Pain", text: "I am in severe pain.", icon: AlertTriangle },
  { id: "DIZZY", label: "Feeling Dizzy", text: "I feel dizzy, please help.", icon: Wind },
  { id: "WHEELCHAIR", label: "Need Wheelchair", text: "I need a wheelchair, please.", icon: Armchair },
  { id: "ALLERGY", label: "Allergic Reaction", text: "I am having an allergic reaction.", icon: ShieldAlert },
];