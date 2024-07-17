"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
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
    const user = await prisma.user.findFirst({ where: { clerkId: userId },include:{savedQuestions:true} });
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
export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  const { questionId, path, userId, hasSaved } = params;
  let query;
  console.log("object");
  if (hasSaved) {
    query = { savedQuestions: { disconnect: { id: questionId } } };
  } else {
    query = { savedQuestions: { connect: { id: questionId } } };
  }
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: query
    });
    console.log(user);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  const { clerkId,filter,pageSize,page,searchQuery } = params;
  
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: {
        savedQuestions: {
          include: {
            author: {
              select: { clerkId: true, picture: true, id: true, name: true },
            },
            tags: { select: { id: true, name: true } },
            answers: true,
            upvotes: { select: { id: true, clerkId: true } },
            downvotes: { select: { id: true, clerkId: true } },
          },
        },
      },
    });
    return {savedQuestions:user?.savedQuestions}
  } catch (error) {
    console.log(error);
    throw error;
  }
}