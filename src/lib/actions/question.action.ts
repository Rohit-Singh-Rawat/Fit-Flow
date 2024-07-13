"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    const questions = await prisma.question.findMany({
      where: {},
      include: {
        author: true,
        tags: { select: { id: true, name: true } },
        answers: true,
        upvotes: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { questions };
  } catch (error) {}
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
