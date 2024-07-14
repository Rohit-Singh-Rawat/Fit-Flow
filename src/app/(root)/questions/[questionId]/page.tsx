import Answer from "@/components/forms/Answer";
import Avatar from "@/components/shared/Avatar";
import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getCompactNumber, getTime } from "@/lib/utils";
import { Clock, Eye, MessageCircleMore } from "lucide-react";
import Link from "next/link";

type Props = { params: { questionId: string } };
const page = async ({ params }: Props) => {
  
  const { questionId } = params;
  const result = await getQuestionById({ questionId });
  const question = result?.question;
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
              altText={question?.author?.name}
              id={question.author.clerkId}
            />
            <Link href={`profile/${question.author.clerkId}`}>
              <p className="paragraph-semibold text-dark300_light700">
                {question.author.name}
              </p>
            </Link>
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
          textStyles="small-medium  text-black  dark:text-[#676F75]"
        />
        <Metric
          icon={<Eye className="size-4 stroke-black dark:stroke-[#676F75]" />}
          title="Views"
          value={getCompactNumber(question.views)}
          textStyles="small-medium text-black  dark:text-[#676F75]"
        />
        <Metric
          icon={
            <MessageCircleMore className="size-4 stroke-black dark:stroke-[#676F75]" />
          }
          title="Answers"
          value={getCompactNumber(question.answers.length)}
          textStyles="small-medium   text-black  dark:text-[#676F75]"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <RenderTag _id={String(tag.id)} name={tag.name} key={tag.id} />
        ))}
      </div>
      <Answer/>
    </>
  );
};
export default page;
