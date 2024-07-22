import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Avatar from "./Avatar";
import { getTime } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import { Minus } from "lucide-react";
import Votes from "./Votes";

import { PaginationSection as Pagination } from "@/components/shared/Pagination";
interface Props {
  questionId: string;
  userId?: string;
  page?: number;
  filter?: string;
  pageSize: number;
}
const AllAnswers = async ({
  questionId,
  userId,
  page,
  filter,
  pageSize,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page,
    pageSize: pageSize,
    filter: filter,
  });
  const totalPages = Math.ceil(
    (result?.totalAnswers? result?.totalAnswers : 0) / pageSize,
  );
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {result?.answers?.length} Answers
        </h3>

        <Filter
          filters={AnswerFilters}
          containerClasses=""
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div>
        {result?.answers.map((answer) => (
          <article key={answer.id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex flex-1 items-start gap-2 sm:items-center">
                {" "}
                <Avatar
                  altText={answer.author.name}
                  imageUrl={answer.author.picture}
                  id={answer.author.clerkId}
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_dark500 ml-0.5 mt-0.5 line-clamp-1 flex items-center justify-center">
                    <span className="max-sm:hidden">
                      <Minus size={8} className="mx-0.5" />
                    </span>
                    answered {getTime(answer.createdAt)}{" "}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                {" "}
                <Votes
                  type="Answer"
                  itemId={answer.id}
                  userId={userId}
                  hasupVoted={
                    userId ? answer.upvotes.some((o) => o.id === userId) : false
                  }
                  hasdownVoted={
                    userId
                      ? answer.downvotes.some((o) => o.id === userId)
                      : false
                  }
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                />
              </div>
            </div>

            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AllAnswers;
