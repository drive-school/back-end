import { t } from "elysia";
import prisma from "../../db";

export async function getAllUsers() {
  try {
    return await prisma.user.findMany();
  } catch (e) {
    console.log(e);
    throw new Error("Error fetching users");
  }
}

export async function createUser(body: { name: string; email: string; password: string }) {
  console.log(body);
  if (typeof body === "object" && body !== null) {
    try {
      const { name, email, password } = body;
      return await prisma.user.create({ data: { name, email, password } }).finally(() => prisma.$disconnect());
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user");
    }
  } else {
    console.log(body);
    throw new Error("Body must be an object");
  }
}
