import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY!,
});

export async function generateGeminiResponse(prompt: string) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? "No response from Gemini.";
}
