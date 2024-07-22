"use server";

import prisma from "../db";
import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
  try {
    const { query, type } = params;
    const searchableTypes = ["question", "user", "tag", "answer"];

    let results = [];
    const modelsAndTypes: {
      model: any;
      searchField: string;
      type: string;
    }[] = [
      {
        model: prisma.question,
        searchField: "title",
        type: "question",
      },
      {
        model: prisma.user,
        searchField: "name",
        type: "user",
      },
      {
        model: prisma.tag,
        searchField: "name",
        type: "tag",
      },
      {
        model: prisma.answer,
        searchField: "content",
        type: "answer",
      },
    ];
    const typeLower = type?.toLocaleLowerCase();
    if (!typeLower || !searchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model.findMany({
          where: {
            [searchField]: { contains: query, mode: "insensitive" },
          },
          take: 2,
        });
        results.push(
          ...queryResults.map((item: any) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.questionId
                  : item.id,
          })),
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("invalid search type");
      }
      const queryResults = await modelInfo.model.findMany({
        where: {
          [modelInfo.searchField]: { contains: query, mode: "insensitive" },
        },
        take: 6,
      });
      results = queryResults.map((item: any) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.questionId
              : item.id,
      }));
    }
    return { results };
  } catch (error) {
    throw error;
  }
}
