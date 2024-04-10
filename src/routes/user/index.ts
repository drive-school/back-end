import { Elysia, t } from "elysia";
import { getAllUsers, createUser, getUserByID, updateUser } from "./handler";

const userRoutes = new Elysia({ prefix: "/user" })
  .get("/", () => getAllUsers())
  .get("/:id", ({ params: { id } }) => getUserByID(id), {
    params: t.Object({ id: t.String() }),
  })
  .post("/", ({ body }) => createUser(body), {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  })
  .put("/:id", ({ params: { id }, body }) => updateUser({ ...body, id }), {
    params: t.Object({ id: t.String() }),
    body: t.Object(
      {
        name: t.String(),
        email: t.String(),
        password: t.String(),
      },
      { minProperties: 1 }
    ),
  });

export default userRoutes;
