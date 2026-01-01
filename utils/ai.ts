import { GoogleGenAI, Type } from "@google/genai";

// Access API Key from environment or fallback
// Using a safe check for process to avoid crashing in pure browser environments
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || "";
  } catch {
    return "";
  }
}

const API_KEY = getApiKey();

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const AiService = {
  generateMicroPlan: async (situation: string, context: string) => {
    if (!ai) return null;

    const prompt = `
      Act as a strict behavioral neuroscientist. 
      The user is quitting smoking. 
      Situation: "${situation}".
      Context (People/Place): "${context}".
      
      Generate a "Micro-Plan" to neutralize this trigger.
      Return JSON only.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              disrupt: { type: Type.STRING, description: "A specific physical action to break the loop (e.g., 'Clench fist', 'Turn 180 degrees'). Max 10 words." },
              replace: { type: Type.STRING, description: "A specific competing response (e.g., 'Drink ice water', 'Chew toothpick'). Max 10 words." },
              affirm: { type: Type.STRING, description: "A short, punchy identity command (e.g., 'I am not a slave to this'). Max 8 words." },
            }
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("AI Plan Gen Failed", e);
      return null;
    }
  },

  challengeBelief: async (belief: string) => {
    if (!ai) return "Focus on the objective. The thought is noise.";

    const prompt = `
      User belief: "${belief}".
      You are an addiction extinction coach. 
      Dismantle this belief using Cognitive Reframing. 
      Be harsh, factual, and brief (max 25 words). 
      No sympathy. Just truth.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: prompt,
      });
      return response.text;
    } catch (e) {
      return "Error connecting to HQ. Fallback: This thought is a chemical lie.";
    }
  }
};