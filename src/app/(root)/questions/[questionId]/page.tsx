import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Avatar from "@/components/shared/Avatar";
import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { PAGE_SIZE } from "@/constants";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { getQuestionById } from "@/lib/actions/question.action";
import { Question, User } from "@/lib/actions/shared.types";
import { getUserById } from "@/lib/actions/user.action";
import { getCompactNumber, getTime } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Clock, Eye, MessageCircleMore } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
type MetaProps = {
  params: { questionId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.questionId;

  const result = await getQuestionById({ questionId: id });
  const question: Question | null = result?.question || null;
  if (!question) {
    return {
      title: "Question not found",
    };
  }

  return {
    title: `${question?.title} |fit flow`,
  };
}
interface Props extends SearchParamsProps {
  params: { questionId: string };
}

const Page = async ({ params, searchParams }: Props) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  const { userId: clerkId } = auth();
  let user: User | null = null;

  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }

  const { questionId } = params;
  const result = await getQuestionById({ questionId });
  const question: Question | null = result?.question || null;
  await viewQuestion({ questionId, userId: user?.id });
  if (!question) {
    return (
      <NoResult
        title={`Question ID ${questionId} Not Found`}
        description={`We couldn't find the question with ID ${questionId}. Please try searching for another question or ask a new one.`}
        href="/questions/ask"
        label="Ask a Question"
      />
    );
  }

  return (
    <div className="max-w-[730px]">
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
      <AllAnswers
        questionId={question.id}
        userId={user?.id}
        page={searchParams.page ? +searchParams.page : 1}
        filter={searchParams.filter}
        pageSize={pageSize}
      />
      <Answer
        question={question.content}
        questionId={question.id}
        authorId={user?.id}
      />
    </div>
  );
};

export default Page;
