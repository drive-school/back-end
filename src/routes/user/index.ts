import { Elysia, t } from "elysia";
import { getAllUsers, createUser } from "./handler";

const userRoutes = new Elysia({ prefix: "/user" })
  .get("/", () => getAllUsers())
  .post("/", ({ body }) => createUser(body), {
    // Changed this line
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  });

export default userRoutes;
