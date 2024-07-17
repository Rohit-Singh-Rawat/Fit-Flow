import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Avatar from "@/components/shared/Avatar";
import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getCompactNumber, getTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Clock, Eye, MessageCircleMore } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  clerkId: string;
  username: string;
  email: string;
  password: string | null;
  bio: string | null;
  picture: string;
  location: string | null;
  portfolioWebsite: string | null;
  reputation: number;
  joinedAt: Date;
  savedQuestions: {
    id: string;
    title: string;
    content: string;
    views: number;
    authorId: string;
    createdAt: Date;
  }[];
};

type Question = {
  id: string;
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    clerkId: string;
    picture: string;
  };
  tags: { id: string; name: string }[];
  upvotes: { id: string }[];
  downvotes: { id: string }[];
  answers: { id: string }[];
};

type Props = { params: { questionId: string } };

const Page = async ({ params }: Props) => {
  const { userId: clerkId } = auth();
  let user: User | null = null;

  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }

  const { questionId } = params;
  const result = await getQuestionById({ questionId });
  const question: Question | null = result?.question || null;
  if (!question) {
    return (
      <NoResult
        title={`Question ID ${questionId} Not Found`}
        description={`We couldn't find the question with ID ${questionId}. Please try searching for another question or ask a new one.`}
        href="/ask"
        label="Ask a Question"  
      />
    );
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
            <Avatar
              imageUrl={question.author.picture}
              altText={question.author.name}
              id={question.author.clerkId}
            />
            <Link href={`/profile/${question.author.clerkId}`}>
              <p className="paragraph-semibold text-dark300_light700">
                {question.author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={question.id}
              userId={user?.id}
              hasupVoted={
                user ? question.upvotes.some((o) => o.id === user.id) : false
              }
              hasdownVoted={
                user ? question.downvotes.some((o) => o.id === user.id) : false
              }
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasSaved={
                user
                  ? user.savedQuestions.some((o) => o.id === question.id)
                  : false
              }
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon={<Clock className="size-4 stroke-black dark:stroke-[#676F75]" />}
          title="asked"
          value={getTime(question.createdAt)}
          textStyles="small-medium text-black dark:text-[#676F75]"
        />
        <Metric
          icon={<Eye className="size-4 stroke-black dark:stroke-[#676F75]" />}
          title="Views"
          value={getCompactNumber(question.views)}
          textStyles="small-medium text-black dark:text-[#676F75]"
        />
        <Metric
          icon={
            <MessageCircleMore className="size-4 stroke-black dark:stroke-[#676F75]" />
          }
          title="Answers"
          value={getCompactNumber(question.answers.length)}
          textStyles="small-medium text-black dark:text-[#676F75]"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <RenderTag _id={String(tag.id)} name={tag.name} key={tag.id} />
        ))}
      </div>
      <AllAnswers questionId={question.id} userId={user?.id} />
      <Answer
        question={question.content}
        questionId={question.id}
        authorId={user?.id}
      />
    </>
  );
};

export default Page;
