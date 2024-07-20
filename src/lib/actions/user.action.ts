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
import { PAGE_SIZE } from "@/constants";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    const { searchQuery, filter, page = 1, pageSize = PAGE_SIZE } = params;
    const skip = (page - 1) * pageSize;
    let orderBy: any = [];
    let where: any = {};
    const Query = searchQuery
      ?.split(" ")
      .filter((x) => x.length > 0)
      .join(" | ");

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

    if (Query) {
      orderBy = [
        {
          _relevance: {
            fields: ["name", "username"],
            search: Query,
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
      skip: skip,
      take: pageSize,
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
    const totalUsers = await prisma.user.count({
      where: where,
      orderBy: orderBy,
    });
    return { users, totalUsers };
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
  const {
    clerkId,
    filter,
    page = 1,
    pageSize = PAGE_SIZE,
    searchQuery,
  } = params;
  let orderBy: any = [];
  let where: any = {};
  const skip = (page - 1) * pageSize;
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");

  switch (filter) {
    case "most_recent":
      orderBy = [{ createdAt: "asc" }];
      break;
    case "oldest":
      orderBy = [{ createdAt: "desc" }];
      break;
    case "most_voted":
      orderBy = [{ upvotes: { _count: "desc" } }];
      break;
    case "most_viewed":
      orderBy = [{ views: "desc" }];
      break;
    case "most_answered":
      orderBy = [{ answers: { _count: "desc" } }];
      break;
    default:
      orderBy = [{ createdAt: "desc" }];
      break;
  }
  if (Query) {
    orderBy = [
      {
        _relevance: {
          fields: ["title", "content"],
          search: Query,
          sort: "asc",
        },
      },
      ...orderBy,
    ];
    where = {
      ...where,
      OR: [
        {
          title: {
            search: Query,
            mode: "insensitive",
          },
        },
        {
          content: {
            search: Query,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: {
        savedQuestions: {
          where: where,
          skip: skip,
          take: pageSize,
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
    const userc = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      include: {
        _count: {
          select: { savedQuestions: { where: where } },
        },
      },
    });
    return { savedQuestions: user?.savedQuestions,totalQuestions:userc?._count.savedQuestions };
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
