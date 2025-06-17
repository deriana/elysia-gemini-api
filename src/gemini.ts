import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY!,
});

export async function generateGeminiResponse(
  history: { role: "user" | "model"; parts: { text: string }[] }[]
) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash", 
    contents: history,
  });

  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? "No response from Gemini.";
}
