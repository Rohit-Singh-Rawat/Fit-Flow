"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function getAnswers(params: GetAnswersParams) {
  const { questionId } = params;
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId },
      include: {
        author: {
          select: { id: true, clerkId: true, picture: true, name: true },
        },
        upvotes: true,
        downvotes: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { answers };
  } catch (error) {}
}

export async function createAnswer(params: CreateAnswerParams): Promise<void> {
  try {
    const { authorId, content, path, questionId } = params;

    const answer = await prisma.answer.create({
      data: {
        content: content,

        author: { connect: { id: authorId } },
        question: { connect: { id: questionId } },
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating question:", error);
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
  console.log("d3dd23", query);
  try {
    const answer = await prisma.answer.update({
      where: { id: answerId },
      data: query,
    });
    console.log(answer);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
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

    revalidatePath(path);
  } catch (error) {}
}
