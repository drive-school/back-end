import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import userRoutes from "./routes/user";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(userRoutes)
  .use(swagger())
  .listen(Bun.env.API_PORT || 9696);

console.log(`🦊 ${Bun.env.API_NAME} is running at ${app.server?.hostname}:${Bun.env.API_PORT || 9696}`);
