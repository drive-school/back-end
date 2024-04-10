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

export async function getUserByID(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (e) {
    console.log(e);
    throw new Error("Error fetching user");
  }
}

export async function createUser(body: { name: string; email: string; password: string }) {
  if (typeof body === "object" && body !== null) {
    try {
      const { name, email, password } = body;

      const EmailAlreadyExists = await prisma.user.findFirst({ where: { email } });
      if (EmailAlreadyExists) {
        throw new Error("Email already exists");
      }

      return await prisma.user.create({ data: { name, email, password } }).finally(() => prisma.$disconnect());
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user");
    }
  } else {
    throw new Error("Body must be an object");
  }
}

export async function updateUser(id: string, body: { name: string; email: string; password: string }) {
  if (typeof body === "object" && body !== null) {
    try {
      const { name, email, password } = body;

      const user = await prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw new Error("User not found");
      }

      return await prisma.user
        .update({ where: { id }, data: { name, email, password } })
        .finally(() => prisma.$disconnect());
    } catch (e) {
      console.log(e);
      throw new Error("Error updating user");
    }
  } else {
    throw new Error("Body must be an object");
  }
}
