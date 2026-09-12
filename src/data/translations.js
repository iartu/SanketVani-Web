// Keyed by the exact English text used in modeManager.js, emergencyCards.js,
// and commonPhrases.js. If a phrase isn't found here, translate() falls back
// to the English text so nothing ever breaks — it just won't be translated.
export const translations = {
  // --- Hospital mode (from partner's modeManager.js) ---
  "Need doctor immediately": {
    "hi-IN": "मुझे तुरंत डॉक्टर चाहिए",
    "mr-IN": "मला ताबडतोब डॉक्टर हवे आहेत",
  },
  "Where is the reception?": {
    "hi-IN": "रिसेप्शन कहाँ है?",
    "mr-IN": "रिसेप्शन कुठे आहे?",
  },
  "I am in pain": {
    "hi-IN": "मुझे दर्द हो रहा है",
    "mr-IN": "मला वेदना होत आहेत",
  },

  // --- Transport mode ---
  "This is an emergency": {
    "hi-IN": "यह एक आपातकालीन स्थिति है",
    "mr-IN": "ही आणीबाणीची परिस्थिती आहे",
  },
  "Where is the ticket counter?": {
    "hi-IN": "टिकट काउंटर कहाँ है?",
    "mr-IN": "तिकीट काउंटर कुठे आहे?",
  },
  "I need help": {
    "hi-IN": "मुझे मदद चाहिए",
    "mr-IN": "मला मदत हवी आहे",
  },

  // --- Police mode ---
  "I need urgent help": {
    "hi-IN": "मुझे तुरंत मदद चाहिए",
    "mr-IN": "मला तातडीने मदत हवी आहे",
  },
  "Where is the police station?": {
    "hi-IN": "पुलिस स्टेशन कहाँ है?",
    "mr-IN": "पोलीस स्टेशन कुठे आहे?",
  },
  "I have been hurt": {
    "hi-IN": "मुझे चोट लगी है",
    "mr-IN": "मला दुखापत झाली आहे",
  },

  // --- Emergency quick-action cards ---
  "I need water, please.": {
    "hi-IN": "मुझे पानी चाहिए, कृपया।",
    "mr-IN": "मला पाणी हवे आहे, कृपया.",
  },
  "Please call an ambulance immediately.": {
    "hi-IN": "कृपया तुरंत एम्बुलेंस बुलाएं।",
    "mr-IN": "कृपया ताबडतोब रुग्णवाहिका बोलवा.",
  },
  "I am in severe pain.": {
    "hi-IN": "मुझे बहुत तेज़ दर्द हो रहा है।",
    "mr-IN": "मला खूप तीव्र वेदना होत आहेत.",
  },

  // --- Common phrases / greetings ---
  "Hi, how are you?": {
    "hi-IN": "नमस्ते, आप कैसे हैं?",
    "mr-IN": "नमस्कार, तुम्ही कसे आहात?",
  },
  "My name is {name}.": {
    "hi-IN": "मेरा नाम {name} है।",
    "mr-IN": "माझं नाव {name} आहे.",
  },
  "Thank you.": {
    "hi-IN": "धन्यवाद।",
    "mr-IN": "धन्यवाद.",
  },
  "Nice to meet you.": {
    "hi-IN": "आपसे मिलकर अच्छा लगा।",
    "mr-IN": "तुम्हाला भेटून आनंद झाला.",
  },
};

// Returns the translated string for a given phrase + language code.
// English or unknown phrases just pass through unchanged.
export function translate(text, langCode) {
  if (langCode === "en-IN") return text;
  return translations[text]?.[langCode] || text;
}
