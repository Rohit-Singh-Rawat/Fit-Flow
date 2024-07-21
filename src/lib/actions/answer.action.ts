"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { PAGE_SIZE } from "@/constants";

export async function getAnswers(params: GetAnswersParams) {
  const { questionId, filter, page = 1, pageSize = PAGE_SIZE } = params;
  const skip = (page - 1) * pageSize;
  let orderBy: any = [];
  switch (filter) {
    case "highestUpvotes":
      orderBy = [{ upvotes: { _count: "desc" } }];
      break;
    case "lowestUpvotes":
      orderBy = [{ upvotes: { _count: "asc" } }];
      break;
    case "recent":
      orderBy = [{ createdAt: "desc" }];
      break;
    case "old":
      orderBy = [{ createdAt: "asc" }];
      break;
    default:
      orderBy: [{ createdAt: "desc" }];
      break;
  }
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId },
      skip,
      take: pageSize,
      include: {
        author: {
          select: { id: true, clerkId: true, picture: true, name: true },
        },
        upvotes: true,
        downvotes: true,
      },
      orderBy,
    });
    const totalAnswers = await prisma.answer.count({
      where: { questionId },

      orderBy,
    });
    return { answers, totalAnswers };
  } catch (error) {
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  const { authorId, content, path, questionId } = params;
  try {
    const answer = await prisma.answer.create({
      data: {
        content: content,

        author: { connect: { id: authorId } },
        question: { connect: { id: questionId } },
      },
      include: { question: { include: { tags: true } } },
    });
    await prisma.interaction.create({
      data: {
        action: "answer",
        answerId: answer.id,
        userId: authorId,
        tags: {
          connect:
            answer.question?.tags?.map((tag) => ({ name: tag.name })) || [],
        },
      },
    });
    await prisma.user.update({
      where: { id: authorId },
      data: { reputation: { increment: 15 } },
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}

// export async function getQuestionById(params: GetQuestionByIdParams) {
//   const { questionId } = params;
//   try {
//     const question = await prisma.question.findUnique({
//       where: { id: questionId },
//       include: {
//         author: {
//           select: { clerkId: true, picture: true, id: true, name: true },
//         },
//         tags: { select: { id: true, name: true } },
//         answers: true,
//         upvotes: true,
//       },
//     });
//     return { question };
//   } catch (error) {}
// }

export async function upVoteAnswer(params: AnswerVoteParams) {
  const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
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
    const answer = await prisma.answer.update({
      where: { id: answerId },
      data: query,
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        reputation: { increment: hasdownVoted ? 0 : hasupVoted ? -2 : 2 },
      },
    });
    await prisma.user.update({
      where: { id: answer.authorId },
      data: {
        reputation: { increment: hasdownVoted ? 0 : hasupVoted ? -10 : 10 },
      },
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
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
    const answer = await prisma.answer.update({
      where: { id: answerId },
      data: query,
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        reputation: { increment: hasupVoted ? 0 : hasdownVoted ? -2 : 2 },
      },
    });
    await prisma.user.update({
      where: { id: answer.authorId },
      data: {
        reputation: { increment: hasupVoted ? 0 : hasdownVoted ? -10 : 10 },
      },
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}
export async function deleteAnswer(params: DeleteAnswerParams) {
  const { answerId, path } = params;

  try {
    const question = await prisma.answer.delete({
      where: { id: answerId },
    });
  } catch (error) {
    return {
      error: "Some thing Went wrong",
    };
  } finally {
    revalidatePath(path);
  }
}
