"use server";

import { PAGE_SIZE } from "@/constants";
import prisma from "../db";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.types";

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  const { tagId, page = 1, pageSize = PAGE_SIZE, searchQuery } = params;
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");

  let orderBy: any = {};
  let where: any = {};
    const skip = (page - 1) * pageSize;

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
          skip: skip,
          take: pageSize,
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
    const questionsC = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        _count: {
          select: {
            questions: {
              where: where,

            },
          },
        },
      },
    });
    return { tagWithQuestion, totalQuestions:questionsC?._count.questions };
  } catch (error) {
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  const { page = 1, pageSize = PAGE_SIZE, searchQuery, filter } = params;
  let orderBy: any = [];
  let where: any = {};
  const skip = (page - 1) * pageSize;
  const Query = searchQuery
    ?.split(" ")
    .filter((x) => x.length > 0)
    .join(" | ");
  switch (filter) {
    case "popular":
      orderBy = [{ questions: { _count: "desc" } }];
      break;
    case "oldest":
      orderBy = [{ createdAt: "asc" }];
      break;
    case "name":
      orderBy = [{ name: "asc" }];
      break;
    case "recent":
      orderBy = [{ createdAt: "desc" }];
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
      skip: skip,
      take: pageSize,
      include: {
        _count: { select: { questions: true } },
      },
      orderBy: orderBy,
    });
    const totalTags = await prisma.tag.count({
      where: where,

      orderBy: orderBy,
    });
    return { tags, totalTags };
  } catch (error) {
    console.log(error);
    throw error;
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
