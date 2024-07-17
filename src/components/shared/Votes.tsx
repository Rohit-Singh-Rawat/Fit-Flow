"use client";
import { getCompactNumber } from "@/lib/utils";
import { ArrowBigDownDash, ArrowBigUpDash, Star } from "lucide-react";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";

type Props = {
  type: string;
  itemId: string;
  userId?: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
};
export default function Votes({
  downvotes,
  hasSaved,
  hasdownVoted,
  hasupVoted,
  itemId,
  type,
  upvotes,
  userId,
}: Props) {
  const pathName = usePathname();
  console.log(hasdownVoted);
  const handleUpVote = async () => {
    if (!userId) {
      return;
    }
    if (type == "Question") {
      console.log("object");
      await upVoteQuestion({
        hasdownVoted,
        hasupVoted,
        path: pathName,
        questionId: itemId,
        userId,
      });
    }
    if (type == "Answer") {
      await upVoteAnswer({
        hasdownVoted,
        hasupVoted,
        path: pathName,
        answerId: itemId,
        userId,
      });
    }
  };

  const handleDownVote = async () => {
    if (!userId) {
      return;
    }
    if (type == "Question") {
      await downVoteQuestion({
        hasdownVoted,
        hasupVoted,
        path: pathName,
        questionId: itemId,
        userId,
      });
    }
    if (type == "Answer") {
      await downVoteAnswer({
        hasdownVoted,
        hasupVoted,
        path: pathName,
        answerId: itemId,
        userId,
      });
    }
    return;
  };

  const handleSave = () => {
    // Handle save logic here
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <ArrowBigUpDash
            onClick={handleUpVote}
            size={25}
            stroke="1"
            className={`cursor-pointer ${hasupVoted ? "fill-red-800 stroke-red-800 dark:fill-red-600 dark:stroke-red-600" : "stroke-dark-500 dark:stroke-slate-200"}`}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {getCompactNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <ArrowBigDownDash
            size={25}
            onClick={handleDownVote}
            className={`cursor-pointer ${hasdownVoted ? "fill-red-800 stroke-red-800 dark:fill-red-600 dark:stroke-red-600" : "stroke-dark-500 dark:stroke-slate-200"}`}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {getCompactNumber(downvotes)}
            </p>
          </div>
        </div>
        {type == "Question" && <Star color="#a6ff00" onClick={handleSave} />}
      </div>
    </div>
  );
}
