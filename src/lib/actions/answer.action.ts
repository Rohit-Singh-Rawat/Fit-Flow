"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function getAnswers(params: GetAnswersParams) {
  const { questionId } = params;
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId },
      include: {
        author: { select: { id: true, clerkId: true, picture: true } },
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
        Question: { connect: { id: questionId } },
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
