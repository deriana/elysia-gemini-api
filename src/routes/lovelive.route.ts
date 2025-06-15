import { Elysia, t } from "elysia";
import { buildUniversalPrompt } from "../utils/buildPrompt";
import { generateGeminiResponse } from "../gemini";
import { loveLiveList } from "../data/lovelive";

export const loveLiveRoute = new Elysia().post(
  "/lovelive",
  async ({ body }) => {
    const userPrompt = body.prompt;

    const prompt = buildUniversalPrompt(userPrompt, loveLiveList, "lovelive");

    const result = await generateGeminiResponse(prompt);

    return { response: result };
  },
  {
    body: t.Object({
      prompt: t.String(),
    }),
  }
);