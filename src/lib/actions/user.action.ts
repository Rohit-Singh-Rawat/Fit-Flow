"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    const { searchQuery, filter } = params;
    let orderBy: any = [];
    let where: any = {};
    switch (filter) {
      case "new_users":
        orderBy = [{ joinedAt: "desc" }];
        break;
      case "old_users":
        orderBy = [{ joinedAt: "asc" }];
        break;
      case "top_contributors":
        orderBy = [{ reputation: "desc" }];
        break;

      default:
        break;
    }

    if (searchQuery) {
      orderBy = [
        {
          _relevance: {
            fields: ["name", "username"],
            search: searchQuery,
            sort: "asc",
          },
        },
        ...orderBy,
      ];
      where = {
        ...where,
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const users = await prisma.user.findMany({
      where: where,
      orderBy: orderBy,
      select: {
        id: true,
        clerkId: true,
        picture: true,
        name: true,
        username: true,
        password: false,
        email: true,
        bio: true,
      },
    });
    console.log(users,where,orderBy,filter )
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: { userId: string }) {
  try {
    const { userId } = params;
    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
      include: { savedQuestions: true },
    });
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
    return updatedUser;
  } catch (error) {
    throw error;
  } finally {
    revalidatePath(path);
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
  if (hasSaved) {
    query = { savedQuestions: { disconnect: { id: questionId } } };
  } else {
    query = { savedQuestions: { connect: { id: questionId } } };
  }
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: query,
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
    revalidatePath("/collection");
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  const { clerkId, filter, pageSize, page, searchQuery } = params;
  let orderBy: any = {};
  let where: any = {};

  if (searchQuery) {
    orderBy = {
      _relevance: {
        fields: ["title", "content"],
        search: searchQuery,
        sort: "asc",
      },
    };
    where = {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    };
  } else {
    orderBy = {
      createdAt: "desc",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: {
        savedQuestions: {
          where: where,
          include: {
            author: {
              select: { clerkId: true, picture: true, id: true, name: true },
            },
            tags: { select: { id: true, name: true } },
            answers: true,
            upvotes: { select: { id: true, clerkId: true } },
            downvotes: { select: { id: true, clerkId: true } },
          },
          orderBy: orderBy,
        },
      },
    });
    return { savedQuestions: user?.savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    const { userId } = params;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        _count: { select: { authoredQuestions: true, authoredAnswers: true } },
      },
    });
    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    const { userId, page, pageSize } = params;
    const questions = await prisma.question.findMany({
      where: { authorId: userId },
      include: {
        author: true,
        tags: { select: { id: true, name: true } },
        answers: true,
        upvotes: true,
      },
      orderBy: [{ views: "desc" }, { upvotes: { _count: "desc" } }],
    });
    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    const { userId, page, pageSize } = params;
    const answers = await prisma.answer.findMany({
      where: { authorId: userId },
      include: {
        question: true,
        author: true,
        upvotes: true,
      },
      orderBy: [{ upvotes: { _count: "desc" } }],
    });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
