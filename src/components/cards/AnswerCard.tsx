import Link from "next/link";

import Metric from "../shared/Metric";
import { getCompactNumber, getTime } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { Dot, ThumbsUp } from "lucide-react";
import Avatar from "../shared/Avatar";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  id: string;
  question: {
    id: string;
    title: string;
  };
  author: {
    id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/questions/${question.id}/#${id}`}
      className="card-wrapper card-wrapper rounded-[15px] border border-[#e2e5ee] p-9 px-11 py-9 dark:border-[#282626]"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTime(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex-between flex gap-2">
          <Avatar
            altText={author.name}
            imageUrl={author.picture}
            id={author.id}
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

        <div className="flex-center gap-3">
          <Metric
            icon={
              <ThumbsUp className="size-4 stroke-black dark:stroke-[#676F75]" />
            }
            value={getCompactNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
