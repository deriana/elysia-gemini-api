import { generateGeminiResponse } from "../gemini";

export async function handleGeminiRequest({ body }: { body: { prompt: string } }) {
  try {
    const result = await generateGeminiResponse(body.prompt);
    return { response: result };
  } catch (err) {
    console.error("Gemini Error:", err);
    return { error: "Failed to generate response" };
  }
}
