import { Elysia } from "elysia";
import { handleGeminiRequest } from "../controller/gemini.controller";

export const geminiRoute = new Elysia().post("/gemini", handleGeminiRequest);
