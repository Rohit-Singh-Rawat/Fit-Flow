"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";

export async function getAllUsers(params:GetAllUsersParams) {
  try {
    // const {  } = params;
    const users = await prisma.user.findMany({ where: {  } });
    return {users};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: { userId: string }) {
  try {
    const { userId } = params;
    const user = await prisma.user.findFirst({ where: { clerkId: userId } });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({ data: userParams });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateUser(userParams: UpdateUserParams) {
  const { clerkId, updateData, path } = userParams;
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: updateData,
    });
    revalidatePath(path);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(userParams: DeleteUserParams) {
  const { clerkId } = userParams;
  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkId },
    });
    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
