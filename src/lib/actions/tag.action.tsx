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
  const { page, pageSize, searchQuery, filter } = params;
  let orderBy: any = [];
  let where: any = {};
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");
  switch (filter) {
    case "popular":
      orderBy = [{ questions:{_count:'desc'} }];
      break;
    case "oldest":
      orderBy = [{ createdAt: "desc" }];
      break;
    case "name":
      orderBy = [{ name:'asc'}];
      break;
    case "recent":
      orderBy = [{ createdAt: "asc" }];
      break;

    default:
      orderBy = [{ createdAt: "desc" }];
      break;
  }
  if (Query) {
    orderBy = [
      {
        _relevance: {
          fields: "name",
          search: Query,
          sort: "asc",
        },
      },
      ...orderBy,
    ];
    where = {
      ...where,
      name: {
        contains: searchQuery,
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
    console.log(tags,where,orderBy)
    return { tags };
  } catch (error) {
    console.log(error)
  }
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
