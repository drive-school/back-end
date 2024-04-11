import { Elysia, t } from "elysia";
import { createCostumer, getCostumers } from "./handler";

const stripeRoutes = new Elysia({ prefix: "/stripe" })
  .get("/", () => getCostumers)
  .post("/", ({ body }) => createCostumer, {
    body: t.Object({
      name: t.String({
        minLength: 3,
        maxLength: 15,
      }),
      email: t.String({
        format: "email",
      }),
      phone: t.Optional(
        t.String({
          format: "phone",
        })
      ),
    }),
  });

export default stripeRoutes;
