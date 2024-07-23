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
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

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
        topTags:true
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

export async function getUserById(params: GetUserByIdParams) {
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
      orderBy = [{ createdAt: "desc" }];
      break;
    case "oldest":
      orderBy = [{ createdAt: "asc" }];
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
    return {
      savedQuestions: user?.savedQuestions,
      totalQuestions: userc?._count.savedQuestions,
    };
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
        authoredAnswers: {
          include: { _count: { select: { upvotes: true } } },
        },
        authoredQuestions: {
          include: { _count: { select: { upvotes: true } } },
        },
      },
    });
    if (!user) {
      return { error: "no user found" };
    }
    const totalQuestionsUpvotes = user.authoredQuestions.reduce(
      (sum, question) => sum + question._count.upvotes,
      0,
    );
    const totalAnswersUpvotes = user.authoredAnswers.reduce(
      (sum, answer) => sum + answer._count.upvotes,
      0,
    );
    const totalQuestionsView = user.authoredQuestions.reduce(
      (sum, question) => sum + question.views,
      0,
    );
    const criteria = [
      {
        type: "QUESTION_COUNT" as BadgeCriteriaType,
        count: user._count.authoredQuestions,
      },
      {
        type: "ANSWER_COUNT" as BadgeCriteriaType,
        count: user._count.authoredAnswers,
      },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: totalQuestionsUpvotes,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: totalAnswersUpvotes,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: totalQuestionsView,
      },
    ];
    const badgeCounts = assignBadges({ criteria });
    return { user, badgeCounts };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    const { userId, page = 1, pageSize = PAGE_SIZE } = params;
    const skip = (page - 1) * pageSize;
    const questions = await prisma.question.findMany({
      where: { authorId: userId },
      skip: skip,
      take: pageSize,
      include: {
        author: true,
        tags: { select: { id: true, name: true } },
        answers: true,
        upvotes: true,
      },
      orderBy: [{ views: "desc" }, { upvotes: { _count: "desc" } }],
    });
    const totalQuestions = await prisma.question.count({
      where: { authorId: userId },

      orderBy: [{ views: "desc" }, { upvotes: { _count: "desc" } }],
    });
    return { questions, totalQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    const { userId, page = 1, pageSize = PAGE_SIZE } = params;
    const skip = (page - 1) * pageSize;
    const answers = await prisma.answer.findMany({
      where: { authorId: userId },
      skip: skip,
      take: pageSize,
      include: {
        question: true,
        author: true,
        upvotes: true,
      },
      orderBy: [{ upvotes: { _count: "desc" } }],
    });
    const totalAnswers = await prisma.answer.count({
      where: { authorId: userId },

      orderBy: [{ upvotes: { _count: "desc" } }],
    });
    return { answers, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getToptags(params: { userId: string }) {
  try {
    const { userId } = params;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const userInteractions = await prisma.interaction.findMany({
      where: { userId: user.id },
      include: { tags: true },
    });

    const userTags: any = userInteractions.reduce<any[]>(
      (tags, interaction) => {
        if (interaction.tags) {
          tags = tags.concat(interaction.tags);
        }
        return tags;
      },
      [],
    );

    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag.id)),
    ];

    const tagCounts = await prisma.tag.findMany({
      where: { id: { in: distinctUserTagIds } },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            Interaction: true,
            questions: true,
          },
        },
      },
      orderBy: {
        Interaction: {
          _count: "desc",
        },
      },
      take: 10,
    });

    const topTags = tagCounts.map((tag) => ({
      id: tag.id,
      name: tag.name,
      count: tag._count.questions,
    }));

    if (topTags.length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          topTags: {
            connect: topTags.map((tag) => ({ id: tag.id })),
          },
        },
      });
    }

    console.log(tagCounts);
    return topTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
