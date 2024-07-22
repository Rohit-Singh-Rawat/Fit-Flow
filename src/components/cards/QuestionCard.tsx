import Link from "next/link";
import React from "react";
import { Dot, Eye, MessageCircleMore, ThumbsUp } from "lucide-react";
import { getCompactNumber, getTime } from "@/lib/utils";
import RenderTag from "../shared/RenderTag";
import Avatar from "../shared/Avatar";
import Metric from "../shared/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Tag {
  id: string;
  name: string;
}
interface author {
  id: string;
  name: string;
  picture: string;
  clerkId: string;
}

interface QuestionProps {
  id: string;
  title: string;
  tags: Tag[];
  author: author;
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: string | Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,clerkId
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[15px] border border-[#e2e5ee] p-9 dark:border-[#282626] sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        {" "}
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 mb-1 flex sm:hidden">
            Asked {getTime(createdAt)}
          </span>
          <Link href={`/questions/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 sm:line-clamp-2">
              {title}
            </h3>
          </Link>
        </div>{" "}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag _id={String(tag.id)} name={tag.name} key={tag.id} />
        ))}
      </div>
      <div className="flex-between gap-4 mt-6 flex w-full items-center flex-wrap">
        <div className="flex-between flex gap-2">
          <Avatar
            altText={author.name}
            imageUrl={author.picture}
            id={author.clerkId}
          />
          <div className="flex items-center justify-center">
            <span className="small-medium text-black dark:text-[#676F75]">
              {author.name}
            </span>
            <Dot className="stroke-black dark:stroke-white max-sm:hidden" />
            <span className="small-medium line-clamp-1 text-black dark:text-[#676F75] max-sm:hidden">
              asked {getTime(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Metric
            icon={
              <ThumbsUp className="size-4 stroke-black dark:stroke-[#676F75]" />
            }
            title="votes"
            value={getCompactNumber(upvotes)}
            textStyles="small-medium  text-black  dark:text-[#676F75]"
          />
          <Metric
            icon={<Eye className="size-4 stroke-black dark:stroke-[#676F75]" />}
            title="Views"
            value={getCompactNumber(views)}
            textStyles="small-medium text-black  dark:text-[#676F75]"
          />
          <Metric
            icon={
              <MessageCircleMore className="size-4 stroke-black dark:stroke-[#676F75]" />
            }
            title="Answers"
            value={getCompactNumber(answers.length)}
            textStyles="small-medium   text-black  dark:text-[#676F75]"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
