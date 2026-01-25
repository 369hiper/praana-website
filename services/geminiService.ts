import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const getSystemInstruction = () => {
  const productInfo = PRODUCTS.map(p => 
    `- ${p.name} (${p.diameter}): ${p.description}. Benefits: ${p.benefits.join(', ')}`
  ).join('\n');

  return `You are Praana AI, a helpful wellness consultant for Praana Coil devices. 
  
  About Praana Coil:
  These are advanced PEMF (Pulsed Electromagnetic Field) devices using Vortex-based technology to promote healing, reduced inflammation, and deep meditation.
  
  Product Lineup:
  ${productInfo}
  
  Your Goal:
  Answer user questions about PEMF technology, suggest the right coil size based on their ailments (e.g., 5cm for joints, 25cm for full body/sleep), and explain how the device works with the mobile app.
  
  Tone:
  Calm, scientific, reassuring, and futuristic. Keep answers concise (under 100 words) unless asked for details.`;
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview as it is fast and efficient for text chat
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    return response.text || "I apologize, I am calibrating my frequencies. Please try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently unable to connect to the knowledge vortex. Please check your connection.";
  }
};