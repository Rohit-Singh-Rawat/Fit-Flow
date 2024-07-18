"use server";

import prisma from "../db";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.types";

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  const { tagId, page, pageSize, searchQuery } = params;
  try {
    const tagWithQuestion = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        questions: {
          include: {
            author: true,
            tags: true,
            upvotes: true,
            downvotes: true,
            answers: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return { tagWithQuestion };
  } catch (error) {}
}

export async function getAllTags(params: GetAllTagsParams) {
  const { page, pageSize, searchQuery } = params;
  try {
    const tags = await prisma.tag.findMany({
      where: {},
      include: {
        _count: { select: { questions: true } },
      },
    });
    return { tags };
  } catch (error) {}
}
