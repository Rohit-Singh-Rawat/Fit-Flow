import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { PaginationSection as Pagination } from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE } from "@/constants";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Home | Fit Flow",
  description:
    "Welcome to Fit Flow, your hub for fitness questions and answers. Explore a variety of topics including workouts, nutrition advice, and expert tips. Whether you're looking to get started on your fitness journey or seeking advanced insights, join our community to ask questions, share knowledge, and achieve your fitness goals.",
  keywords: [
    "fitness",
    "workouts",
    "nutrition",
    "exercise tips",
    "fitness community",
  ],
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  let result;
  const { userId } = auth();
  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize: pageSize,
      });
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: pageSize,
    });
  }

  const questions = result?.questions ?? [];
  const totalPages = Math.ceil(
    (result?.totalQuestions ? result?.totalQuestions : 0) / pageSize,
  );

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={"/questions/ask"}
          className="justify-end max-sm:w-full sm:flex"
        >
          <Button className="inline-flex h-12 min-h-[46px] animate-shimmer items-center justify-center rounded-lg border border-blue-600 bg-light-gradient bg-[length:200%_100%] px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-[#282626] dark:bg-dark-gradient dark:text-light-900 dark:ring-offset-[#1a4334] dark:hover:bg-dark-200 dark:focus:ring-[#0e2618]">
            {" "}
            Ask a question
          </Button>{" "}
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          otherClasses=""
          placeHolder="Search for questions"
          route="/"
        />
        <Filter
          filters={HomePageFilters}
          containerClasses="hidden max-md:flex "
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>{" "}
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6 overflow-hidden">
        {questions?.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Questions Available"
            description="It looks like there are no questions to display right now. Be the first to start the conversation and help others with your fitness knowledge."
            href="/questions/ask"
            label="Ask a Question"
          />
        )}
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};
export default page;
