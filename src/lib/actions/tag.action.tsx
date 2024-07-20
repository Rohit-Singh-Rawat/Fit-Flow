"use server";

import prisma from "../db";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.types";

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  const { tagId, page, pageSize, searchQuery } = params;
const Query = searchQuery
  ?.split(" ")
  .filter((x) => x.length > 0)
  .join(" | ");

  let orderBy: any = {};
  let where: any = {};

  if (Query) {
    orderBy = {
      _relevance: {
        fields: ["title", "content"],
        search: Query,
        sort: "asc",
      },
    };
    where = {
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
  } else {
    orderBy = {
      createdAt: "desc",
    };
  }
  try {
    const tagWithQuestion = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        questions: {
          where: where,
          include: {
            author: true,
            tags: true,
            upvotes: true,
            downvotes: true,
            answers: true,
          },
          orderBy: orderBy,
        },
      },
    });
    return { tagWithQuestion };
  } catch (error) {}
}

export async function getAllTags(params: GetAllTagsParams) {
  const { page, pageSize, searchQuery } = params;
  let orderBy: any = {};
  let where: any = {};
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");

  if (Query) {
    orderBy = {
      _relevance: {
        fields: ["name"],
        search: Query,
        sort: "asc",
      },
    };
    where = {
      name: {
        search: Query,
        mode: "insensitive",
      },
    };
  }
  try {
    const tags = await prisma.tag.findMany({
      where: where,
      include: {
        _count: { select: { questions: true } },
      },
      orderBy: orderBy,
    });
    return { tags };
  } catch (error) {}
}
export async function getPopularTags() {
  try {
    const tags = await prisma.tag.findMany({
      where: {},
      select: { id: true, name: true, _count: { select: { questions: true } } },
      orderBy: { questions: { _count: "desc" } },
      take: 5,
    });
    return { tags };
  } catch (error) {
    throw error;
  }
}
