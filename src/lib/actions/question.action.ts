"use server";
import { EditQuestionParams } from "./shared.types.d";
import { revalidatePath } from "next/cache";
import prisma from "../db";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import { PAGE_SIZE } from "@/constants";
export async function getQuestions(params: GetQuestionsParams) {
  const { searchQuery, filter, page = 1, pageSize = PAGE_SIZE } = params;
  const skip = (page - 1) * pageSize;
  let orderBy: any = [];
  let where: any = {};
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");

  switch (filter) {
    case "newest":
      orderBy = [{ createdAt: "desc" }];
      break;
    case "recommended":
      orderBy = [{ upvotes: { _count: "desc" } }];
      break;
    case "frequent":
      orderBy = [{ views: "desc" }];
      break;
    case "unanswered":
      where = { answers: { none: {} } };
      break;
    default:
      orderBy = [{ createdAt: "desc" }];
      break;
  }

  if (Query) {
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
  }
  console.log(Query);
  try {
    const questions = await prisma.question.findMany({
      where: where,
      skip: skip,
      take: pageSize,
      orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
      include: {
        author: true,
        tags: { select: { id: true, name: true } },
        answers: true,
        upvotes: true,
      },
    });
    const totalQuestions = await prisma.question.count({
      where: where,
      orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
    });
    return { questions, totalQuestions };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Unable to fetch questions.");
  }
}

export async function createQuestion(
  params: CreateQuestionParams,
): Promise<void> {
  try {
    const { title, content, tags, authorId, path } = params;

    const question = await prisma.question.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating question:", error);
  }
}
export async function EditQuestion(params: EditQuestionParams): Promise<void> {
  try {
    const { title, content, path, questionId } = params;

    const question = await prisma.question.update({
      where: { id: questionId },
      data: {
        title,
        content,
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error Editing question:", error);
  }
}
export async function getQuestionById(params: GetQuestionByIdParams) {
  const { questionId } = params;
  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        author: {
          select: { clerkId: true, picture: true, id: true, name: true },
        },
        tags: { select: { id: true, name: true } },
        answers: true,
        upvotes: { select: { id: true, clerkId: true } },
        downvotes: { select: { id: true, clerkId: true } },
      },
    });
    return { question };
  } catch (error) {}
}
export async function upVoteQuestion(params: QuestionVoteParams) {
  const { questionId, hasdownVoted, hasupVoted, path, userId } = params;
  let query;
  if (hasupVoted) {
    query = { upvotes: { disconnect: { id: userId } } };
  } else if (hasdownVoted) {
    query = {
      downvotes: { disconnect: { id: userId } },
      upvotes: { connect: { id: userId } },
    };
  } else {
    query = { upvotes: { connect: { id: userId } } };
  }
  try {
    const question = await prisma.question.update({
      where: { id: questionId },
      data: query,
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}

export async function downVoteQuestion(params: QuestionVoteParams) {
  const { questionId, hasdownVoted, hasupVoted, path, userId } = params;
  let query;
  if (hasdownVoted) {
    query = { downvotes: { disconnect: { id: userId } } };
  } else if (hasupVoted) {
    query = {
      downvotes: { connect: { id: userId } },
      upvotes: { disconnect: { id: userId } },
    };
  } else {
    query = { downvotes: { connect: { id: userId } } };
  }
  try {
    const question = await prisma.question.update({
      where: { id: questionId },
      data: query,
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  const { questionId, path } = params;

  try {
    const question = await prisma.question.delete({
      where: { id: questionId },
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}

export async function getHotQuestions() {
  try {
    const questions = await prisma.question.findMany({
      where: {},
      select: { id: true, title: true },
      orderBy: [{ views: "desc" }, { upvotes: { _count: "desc" } }],
      take: 5,
    });
    return { questions };
  } catch (error) {
    throw error;
  }
}
