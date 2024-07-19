import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { ChevronRight } from "lucide-react";
const RightSidebar = async () => {
  const hotQuestions = [
    { _id: 1, title: "How do I use express as a custom server in NextJS?" },
    { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
    { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
    {
      _id: 4,
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },

    { id: 1, title: "How do I use express as a custom" },
  ];
  const popularTags: any = [
    { _id: 1, name: "javascript", totalQuestions: 5 },
    { _id: 2, name: "react", totalQuestions: 5 },
    { _id: 3, name: "next", totalQuestions: 5 },
    {
      id: 4,
      name: "vue",
      totalQuestions: 2,
    },
    {
      id: 1,
      name: "redux",
      totalQuestions: 10,
    },
  ];

  return (
    <section className="sticky right-0 top-0 xl:p-5  flex h-screen pt-[100px]">
      <div className="sticky right-0 top-0 flex flex-col justify-between gap-7 max-xl:hidden lg:w-[330px]">
        <div className="background-light900_dark200 light-border custom-scrollbar overflow-y-auto rounded-2xl border-l p-6 shadow-light-300 dark:shadow-none">
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestions.map((question: any) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
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
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
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
