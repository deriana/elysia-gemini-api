import { Elysia, t } from "elysia";
import { buildUniversalPrompt } from "../utils/buildPrompt";
import { generateGeminiResponse } from "../gemini";
import { animeList } from "../data/anime";

export const animeRoute = new Elysia().post(
  "/anime",
  async ({ body }) => {
    const userPrompt = body.prompt;

    const prompt = buildUniversalPrompt(userPrompt, animeList, "anime");

    const result = await generateGeminiResponse(prompt);

    return { response: result };
  },
  {
    body: t.Object({
      prompt: t.String(),
    }),
  }
);
