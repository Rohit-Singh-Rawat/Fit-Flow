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
    author: { _id: "1", name: "John Doe", picture: "john_doe.jpg" },
    upvotes: 25,
    views: 500,
    answers: [
      {
        _id: "1",
        author: { _id: "2", name: "Jane Smith", picture: "jane_smith.jpg" },
        text: "You can implement caching in Redis by...",
        createdAt: "2022-01-01T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-01T10:00:00.000Z",
  },
  {
    id: 2,
    title: "What are the new features in Python 3.9?",
    tags: [
      { _id: 3, name: "python" },
      { _id: 4, name: "features" },
    ],
    author: { _id: "2", name: "Jane Smith", picture: "jane_smith.jpg" },
    upvotes: 30,
    views: 600,
    answers: [
      {
        _id: "2",
        author: {
          _id: "3",
          name: "Alice Johnson",
          picture: "alice_johnson.jpg",
        },
        text: "Python 3.9 introduces several new features...",
        createdAt: "2022-01-02T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-02T10:00:00.000Z",
  },
  {
    id: 3,
    title: "How to use the useEffect hook in React?",
    tags: [
      { _id: 5, name: "react" },
      { _id: 6, name: "hooks" },
    ],
    author: { _id: "3", name: "Alice Johnson", picture: "alice_johnson.jpg" },
    upvotes: 20,
    views: 400,
    answers: [
      {
        _id: "3",
        author: { _id: "1", name: "John Doe", picture: "john_doe.jpg" },
        text: "The useEffect hook allows you to perform side effects...",
        createdAt: "2022-01-03T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-03T10:00:00.000Z",
  },
  {
    id: 4,
    title: "What is the difference between SQL and NoSQL databases?",
    tags: [
      { _id: 7, name: "sql" },
      { _id: 8, name: "nosql" },
    ],
    author: { _id: "4", name: "Bob Brown", picture: "bob_brown.jpg" },
    upvotes: 40,
    views: 800,
    answers: [
      {
        _id: "4",
        author: { _id: "2", name: "Jane Smith", picture: "jane_smith.jpg" },
        text: "The main difference between SQL and NoSQL databases is...",
        createdAt: "2022-01-04T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-04T10:00:00.000Z",
  },
  {
    id: 5,
    title: "How to create a REST API with Node.js?",
    tags: [
      { _id: 9, name: "node.js" },
      { _id: 10, name: "rest api" },
    ],
    author: { _id: "5", name: "Charlie Green", picture: "charlie_green.jpg" },
    upvotes: 50,
    views: 1000,
    answers: [
      {
        _id: "5",
        author: {
          _id: "3",
          name: "Alice Johnson",
          picture: "alice_johnson.jpg",
        },
        text: "To create a REST API with Node.js, you need to...",
        createdAt: "2022-01-05T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-05T10:00:00.000Z",
  },
  {
    id: 6,
    title: "What is the best way to learn TypeScript?",
    tags: [
      { _id: 11, name: "typescript" },
      { _id: 12, name: "learning" },
    ],
    author: { _id: "6", name: "David White", picture: "david_white.jpg" },
    upvotes: 15,
    views: 300,
    answers: [
      {
        _id: "6",
        author: { _id: "1", name: "John Doe", picture: "john_doe.jpg" },
        text: "The best way to learn TypeScript is by...",
        createdAt: "2022-01-06T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-06T10:00:00.000Z",
  },
  {
    id: 7,
    title: "How to manage state in a React application?",
    tags: [
      { _id: 5, name: "react" },
      { _id: 13, name: "state management" },
    ],
    author: { _id: "7", name: "Emma Black", picture: "emma_black.jpg" },
    upvotes: 35,
    views: 700,
    answers: [
      {
        _id: "7",
        author: { _id: "4", name: "Bob Brown", picture: "bob_brown.jpg" },
        text: "State management in React can be done using...",
        createdAt: "2022-01-07T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-07T10:00:00.000Z",
  },
  {
    id: 8,
    title: "What is the difference between var, let, and const in JavaScript?",
    tags: [
      { _id: 14, name: "javascript" },
      { _id: 15, name: "variables" },
    ],
    author: { _id: "8", name: "Frank Brown", picture: "frank_brown.jpg" },
    upvotes: 45,
    views: 900,
    answers: [
      {
        _id: "8",
        author: {
          _id: "5",
          name: "Charlie Green",
          picture: "charlie_green.jpg",
        },
        text: "The difference between var, let, and const is...",
        createdAt: "2022-01-08T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-08T10:00:00.000Z",
  },
  {
    id: 9,
    title: "How to create a responsive design with Tailwind CSS?",
    tags: [
      { _id: 16, name: "tailwind css" },
      { _id: 17, name: "responsive design" },
    ],
    author: { _id: "9", name: "Grace Miller", picture: "grace_miller.jpg" },
    upvotes: 50,
    views: 1000,
    answers: [
      {
        _id: "9",
        author: { _id: "6", name: "David White", picture: "david_white.jpg" },
        text: "To create a responsive design with Tailwind CSS...",
        createdAt: "2022-01-09T12:00:00.000Z",
      },
    ],
    createdAt: "2022-01-09T10:00:00.000Z",
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
