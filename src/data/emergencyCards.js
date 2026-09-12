import { Droplet, Siren, AlertTriangle } from "lucide-react";

// Manually tapped, not gesture-triggered — always works even if tracking fails.
export const emergencyCards = [
  { id: "WATER", label: "Need Water", text: "I need water, please.", icon: Droplet },
  { id: "AMBULANCE", label: "Call Ambulance", text: "Please call an ambulance immediately.", icon: Siren },
  { id: "PAIN", label: "Severe Pain", text: "I am in severe pain.", icon: AlertTriangle },
];
