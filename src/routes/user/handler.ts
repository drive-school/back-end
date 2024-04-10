import { t } from "elysia";
import prisma from "../../db";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return {
      message: "Users found",
      code: "SUCCESS",
      data: users,
    };
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

    return {
      message: "User found",
      code: "SUCCESS",
      data: user,
    };
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
        const EmailAlreadyExistsError = new Error("Email already exists");
        return { message: EmailAlreadyExistsError.message, code: "ERROR" };
      }

      const newUser = await prisma.user.create({ data: { name, email, password } }).finally(() => prisma.$disconnect());

      return {
        message: "User created successfully",
        code: "SUCCESS",
        data: newUser,
      };
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user");
    }
  } else {
    throw new Error("Body must be an object");
  }
}

export async function updateUser(id: string, body: { name?: string; email?: string }) {
  if (typeof body === "object" && body !== null) {
    try {
      const updateData: { name?: string; email?: string } = {};

      if (body.name) updateData.name = body.name;
      if (body.email) updateData.email = body.email;

      const user = await prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = await prisma.user
        .update({ where: { id }, data: updateData })
        .finally(() => prisma.$disconnect());

      return {
        message: "User updated successfully",
        code: "SUCCESS",
        data: updatedUser,
      };
    } catch (e) {
      console.log(e);
      throw new Error("Error updating user");
    }
  } else {
    throw new Error("Body must be an object");
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.delete({ where: { id } }).finally(() => prisma.$disconnect());
    return { message: "User deleted successfully", code: "SUCCESS" };
  } catch (e) {
    console.log(e);
    throw new Error("Error deleting user");
  }
}
