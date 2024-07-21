import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { ChevronRight } from "lucide-react";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";
const RightSidebar = async () => {
  const {questions: hotQuestions} = await getHotQuestions();
  const {tags:popularTags} = await getPopularTags();

  return (
    <section className="sticky right-0 top-0 xl:p-5  flex h-screen xl:pt-[100px]">
      <div className="sticky right-0 top-0 flex flex-col justify-between gap-7 max-xl:hidden lg:w-[330px]">
        <div className="background-light900_dark200 light-border custom-scrollbar overflow-y-auto rounded-2xl border-l p-6 shadow-light-300 dark:shadow-none">
         
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestions.map((question: any) => (
              <Link
                href={`/questions/${question.id}`}
                key={question.id}
                className="flex cursor-pointer items-center justify-between gap-5"
              >
                <p className="body-medium text-dark500_light700 line-clamp-3">
                  {question.title}
                </p>
                <div>
                  <ChevronRight className="invert-colors size-5 stroke-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="background-light900_dark200 light-border custom-scrollbar overflow-y-auto rounded-2xl border-l p-6 shadow-light-300 dark:shadow-none">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map((tag: any) => (
              <RenderTag
                key={tag.id}
                _id={tag.id}
                name={tag.name}
                totalQuestions={tag._count.questions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
