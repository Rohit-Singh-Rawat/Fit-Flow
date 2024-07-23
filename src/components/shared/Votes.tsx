"use client";
import { getCompactNumber } from "@/lib/utils";
import { ArrowBigDownDash, ArrowBigUpDash, Star } from "lucide-react";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { toast } from "sonner";
import { useOptimistic } from "react";
import VoteArrow from "../Icons/VoteArrow";

type Props = {
  type: "Question" | "Answer";
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

  const [optimisticState, addOptimistic] = useOptimistic(
    {
      upvotes,
      downvotes,
      hasupVoted,
      hasdownVoted,
      hasSaved,
    },
    (state, update: Object) => ({
      ...state,
      ...update,
    }),
  );

  const handleUpVote = async () => {
    if (!userId) {
      toast.message("Please log in", {
        description: "You must log in to perform this action",
      });
      return;
    }

    const newUpVotes = optimisticState.hasupVoted
      ? optimisticState.upvotes - 1
      : optimisticState.upvotes + 1;
    const newDownVotes = optimisticState.hasdownVoted
      ? optimisticState.downvotes - 1
      : optimisticState.downvotes;

    addOptimistic({
      upvotes: newUpVotes,
      downvotes: newDownVotes,
      hasupVoted: !optimisticState.hasupVoted,
      hasdownVoted: false,
    });
    const response =
      type === "Question"
        ? await upVoteQuestion({
            hasdownVoted: optimisticState.hasdownVoted,
            hasupVoted: optimisticState.hasupVoted,
            path: pathName,
            questionId: itemId,
            userId,
          })
        : await upVoteAnswer({
            hasdownVoted: optimisticState.hasdownVoted,
            hasupVoted: optimisticState.hasupVoted,
            path: pathName,
            answerId: itemId,
            userId,
          });

    if (response?.error) {
      toast.message("Action failed", {
        description: "Failed to Upvote. Please try again",
      });
      addOptimistic({
        upvotes,
        downvotes,
        hasupVoted,
        hasdownVoted,
      });
    }
  };

  const handleDownVote = async () => {
    if (!userId) {
      toast.message("Please log in", {
        description: "You must log in to perform this action",
      });
      return;
    }

    const newDownVotes = optimisticState.hasdownVoted
      ? optimisticState.downvotes - 1
      : optimisticState.downvotes + 1;
    const newUpVotes = optimisticState.hasupVoted
      ? optimisticState.upvotes - 1
      : optimisticState.upvotes;

    addOptimistic({
      downvotes: newDownVotes,
      upvotes: newUpVotes,
      hasdownVoted: !optimisticState.hasdownVoted,
      hasupVoted: false,
    });

    const response =
      type === "Question"
        ? await downVoteQuestion({
            hasdownVoted: optimisticState.hasdownVoted,
            hasupVoted: optimisticState.hasupVoted,
            path: pathName,
            questionId: itemId,
            userId,
          })
        : await downVoteAnswer({
            hasdownVoted: optimisticState.hasdownVoted,
            hasupVoted: optimisticState.hasupVoted,
            path: pathName,
            answerId: itemId,
            userId,
          });

    if (response?.error) {
      toast.message("Action failed", {
        description: "Failed to Downvote. Please try again",
      });
      addOptimistic({
        upvotes,
        downvotes,
        hasupVoted,
        hasdownVoted,
      });
    }
  };

  const handleSave = async () => {
    if (!userId || optimisticState.hasSaved == null) {
      toast.message("Please log in", {
        description: "You must log in to perform this action",
      });
      return;
    }

    addOptimistic({
      hasSaved: !optimisticState.hasSaved,
    });

    const response = await toggleSaveQuestion({
      hasSaved: optimisticState.hasSaved,
      path: pathName,
      questionId: itemId,
      userId,
    });

    if (response?.error) {
      toast.message("Action failed", {
        description: "Failed to Save. Please try again",
      });
      addOptimistic({
        hasSaved: !optimisticState.hasSaved,
      });
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <button
            onClick={handleUpVote}
            className="flex size-7 items-center justify-center rounded-full bg-transparent text-black hover:bg-slate-200/30 hover:text-red-500 dark:text-white dark:hover:text-red-500"
          >
            {" "}
            <VoteArrow
              className={`size-5 cursor-pointer ${
                optimisticState.hasupVoted
                  ? "fill-red-800 stroke-red-800 dark:fill-red-600 dark:stroke-red-600"
                  : "fill-none stroke-current"
              }`}
            />
          </button>

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {getCompactNumber(optimisticState.upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          {" "}
          <button
            onClick={handleDownVote}
            className="flex size-7 items-center justify-center rounded-full bg-transparent text-black hover:bg-slate-200/30 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
          >
            {" "}
            <VoteArrow
              className={`size-5 rotate-180 cursor-pointer ${
                optimisticState.hasdownVoted
                  ? "fill-blue-800 stroke-blue-800 dark:fill-blue-600 dark:stroke-blue-600"
                  : "fill-none stroke-current"
              }`}
            />
          </button>
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {getCompactNumber(optimisticState.downvotes)}
            </p>
          </div>
        </div>
        {type === "Question" && (
          <Star
            color="#a6ff00"
            onClick={handleSave}
            className="cursor-pointer"
            fill={optimisticState.hasSaved ? "#a6ff00" : "none"}
          />
        )}
      </div>
    </div>
  );
}
