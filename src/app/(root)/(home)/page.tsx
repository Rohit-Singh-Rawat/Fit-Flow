import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
const questions = [
  {
    id: 1,
    title: "How to implement caching in Redis?",
    tags: [
      { _id: 1, name: "redis" },
      { _id: 2, name: "caching" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "/assets/images/rohit.jpg",
    },
    upvotes: 25,
    views: 500,
    answers: [
      {
        _id: "1",
        author: {
          _id: "2",
          name: "Jane Smith",
          picture: "rohit.png",
        },
        text: "You can implement caching in Redis by...",
        createdAt: "2022-01-01T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-01T10:00:00.000Z",
  },

  {
    id: 9,
    title: "How to create a responsive design with Tailwind CSS?",
    tags: [
      { _id: 16, name: "tailwind css" },
      { _id: 17, name: "responsive design" },
    ],
    author: {
      _id: "9",
      name: "Grace Miller",
      picture: "/assets/images/rohit.jpg",
    },
    upvotes: 50,
    views: 122200,
    answers: [
      {
        _id: "9",
        author: { _id: "6", name: "David White", picture: "david_white.jpg" },
        text: "To create a responsive design with Tailwind CSS...",
        createdAt: "2022-01-09T12:00:00.000Z",
      },
    ],
    createdAt: "2024-07-04T10:00:00.000Z",
  },
];
type Props = {};
const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={"/questions/ask"}
          className="justify-end max-sm:w-full sm:flex"
        >
          <Button className="primary-light-gradient dark:primary-dark-gradient px=4 min-h-[46px] py-3 !text-light-900 dark:hover:bg-dark-200">
            Ask a question
          </Button>
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
          filter={HomePageFilters}
          containerClasses="hidden max-md:flex "
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>{" "}
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6 overflow-hidden">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Questions Available"
            description="It looks like there are no questions to display right now. Be the first to start the conversation and help others with your fitness knowledge."
            href="/ask"
            label="Ask a Question"
          />
        )}
      </div>
    </>
  );
};
export default page;
