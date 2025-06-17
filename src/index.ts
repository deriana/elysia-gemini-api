import { Elysia } from "elysia";
import { geminiRoute } from "./routes/gemini.route";
import dotenv from "dotenv";

dotenv.config();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(geminiRoute)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);