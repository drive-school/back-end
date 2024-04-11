import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import userRoutes from "./routes/user";
import { cors } from "@elysiajs/cors";
import stripeRoutes from "./routes/stripe";

const app = new Elysia()
  .use(cors())
  .get("/", async ({ set }) => {
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    set.redirect = "/swagger";
  })
  .use(userRoutes)
  .use(stripeRoutes)
  .use(swagger())
  .listen(Bun.env.API_PORT || 9696);

console.log(`🦊 ${Bun.env.API_NAME} is running at http://${app.server?.hostname}:${Bun.env.API_PORT || 9696}`);
