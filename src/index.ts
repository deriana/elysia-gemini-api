// index.ts
import { Elysia } from "elysia";
import { geminiRoute } from "./routes/gemini.route";
import dotenv from "dotenv";
import { animeRoute } from "./routes/anime.route";
import { dokterRoute } from "./routes/dokter.route";
import { loveLiveRoute } from "./routes/lovelive.route";

dotenv.config();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(geminiRoute)
  .use(animeRoute)
  .use(dokterRoute)
  .use(loveLiveRoute)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);