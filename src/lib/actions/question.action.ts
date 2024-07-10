'use server';

import prisma from "../db";

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  authorId: string;
}

export async function createQuestion(params: CreateQuestionParams): Promise<void> {
  try {
    const { title, content, tags, authorId } = params;

    const question = await prisma.question.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        },

      },
    });
  } catch (error) {
    console.error('Error creating question:', error);
  }
}
