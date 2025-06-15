import { Elysia, t } from "elysia";
import { buildUniversalPrompt } from "../utils/buildPrompt";
import { generateGeminiResponse } from "../gemini";
import { dokterList } from "../data/dokter";

export const dokterRoute = new Elysia().post(
  "/dokter",
  async ({ body }) => {
    const userPrompt = body.prompt;

    const prompt = buildUniversalPrompt(userPrompt, dokterList, "dokter");

    const result = await generateGeminiResponse(prompt);

    return { response: result };
  },
  {
    body: t.Object({
      prompt: t.String(),
    }),
  }
);
