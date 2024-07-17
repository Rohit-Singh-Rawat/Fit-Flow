"use server";

import prisma from "../db";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  const { questionId, userId } = params;
  try {
    const question = await prisma.question.update({
      where: { id: questionId },
      data: { views: { increment: 1 } },
    });
    if (userId) {
      const existingInteration = await prisma.interaction.findFirst({
        where: {
          userId: userId,
          questionId: questionId,
          action: "view",
        },
      });
      if (!existingInteration) {
        const interaction = await prisma.interaction.create({
          data: {
            userId: userId,
            questionId: questionId,
            action: "view",
          },
        });
      }
    }
    return { question };
  } catch (error) {
    console.log(error);
  }
}
