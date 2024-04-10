import { Elysia, t } from "elysia";
import { getAllUsers, createUser, getUserByID, updateUser, deleteUser } from "./handler";

const userRoutes = new Elysia({ prefix: "/user" })
  .get("/", () => getAllUsers())
  .get("/:id", ({ params: { id } }) => getUserByID(id), {
    params: t.Object({ id: t.String() }),
  })
  .post("/", ({ body }) => createUser(body), {
    body: t.Object({
      name: t.String({
        minLength: 3,
        maxLength: 15,
      }),
      email: t.String({
        format: "email",
      }),
      password: t.String({
        minLength: 8,
        maxLength: 20,
      }),
      role: t.Optional(
        t.String({
          enum: ["OWNER", "EMPLOYEE", "USER", "ADMIN", "SUPER_ADMIN"],
        })
      ),
    }),
  })
  .put("/:id", ({ params: { id }, body }) => updateUser(id, { ...body }), {
    params: t.Object({ id: t.String() }),
    body: t.Object(
      {
        name: t.Optional(
          t.String({
            minLength: 3,
            maxLength: 15,
          })
        ),
        email: t.Optional(
          t.String({
            format: "email",
          })
        ),
      },
      { minProperties: 1 }
    ),
  })
  .delete("/:id", ({ params: { id } }) => deleteUser(id), {
    params: t.Object({ id: t.String() }),
  });

export default userRoutes;
