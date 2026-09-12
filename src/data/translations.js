// Keyed by the exact English text used in modeManager.js, emergencyCards.js,
// and commonPhrases.js. If a phrase isn't found here, translate() falls back
// to the English text so nothing ever breaks — it just won't be translated.
export const translations = {
  // --- Hospital mode ---
  "Need doctor immediately": {
    "hi-IN": "मुझे तुरंत डॉक्टर चाहिए",
  },
  "Where is the reception?": {
    "hi-IN": "रिसेप्शन कहाँ है?",
  },
  "I am in pain": {
    "hi-IN": "मुझे दर्द हो रहा है",
  },

  // --- Transport mode ---
  "This is an emergency": {
    "hi-IN": "यह एक आपातकालीन स्थिति है",
  },
  "Where is the ticket counter?": {
    "hi-IN": "टिकट काउंटर कहाँ है?",
  },
  "I need help": {
    "hi-IN": "मुझे मदद चाहिए",
  },

  // --- Police mode ---
  "I need urgent help": {
    "hi-IN": "मुझे तुरंत मदद चाहिए",
  },
  "Where is the police station?": {
    "hi-IN": "पुलिस स्टेशन कहाँ है?",
  },
  "I have been hurt": {
    "hi-IN": "मुझे चोट लगी है",
  },

  // --- Universal gesture responses (Yes / No / Thank You / Wait) ---
  "Yes": {
    "hi-IN": "हाँ",
  },
  "No": {
    "hi-IN": "नहीं",
  },
  "Thank you": {
    "hi-IN": "धन्यवाद",
  },
  "Please wait a moment": {
    "hi-IN": "कृपया एक क्षण रुकें",
  },
  "Please wait": {
    "hi-IN": "कृपया रुकें",
  },

  // --- Emergency quick-action cards ---
  "I need water, please.": {
    "hi-IN": "मुझे पानी चाहिए, कृपया।",
  },
  "Please call an ambulance immediately.": {
    "hi-IN": "कृपया तुरंत एम्बुलेंस बुलाएं।",
  },
  "I am in severe pain.": {
    "hi-IN": "मुझे बहुत तेज़ दर्द हो रहा है।",
  },
  "I feel dizzy, please help.": {
    "hi-IN": "मुझे चक्कर आ रहा है, कृपया मदद करें।",
  },
  "I need a wheelchair, please.": {
    "hi-IN": "मुझे व्हीलचेयर चाहिए, कृपया।",
  },
  "I am having an allergic reaction.": {
    "hi-IN": "मुझे एलर्जी की प्रतिक्रिया हो रही है।",
  },

  // --- Common phrases / greetings (tap-based) ---
  "Hi, how are you?": {
    "hi-IN": "नमस्ते, आप कैसे हैं?",
  },
  "My name is {name}.": {
    "hi-IN": "मेरा नाम {name} है।",
  },
  "Nice to meet you.": {
    "hi-IN": "आपसे मिलकर अच्छा लगा।",
  },
  "I don't understand.": {
    "hi-IN": "मुझे समझ नहीं आया।",
  },
  "Can you repeat that?": {
    "hi-IN": "क्या आप इसे दोहरा सकते हैं?",
  },
  "Excuse me.": {
    "hi-IN": "माफ़ कीजिए।",
  },
};

// Returns the translated string for a given phrase + language code.
// English or unknown phrases just pass through unchanged.
export function translate(text, langCode) {
  if (langCode === "en-IN") return text;
  return translations[text]?.[langCode] || text;
}