import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";
import { PAGE_SIZE } from "@/constants";

import { PaginationSection as Pagination } from "@/components/shared/Pagination";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  const { questions,totalQuestions } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: pageSize,
  });
const totalPages = Math.ceil(totalQuestions / pageSize);
  return (
    <>
      {questions.length === 0 ? (
        <p>No questions Asked</p>
      ) : (
        questions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes.length}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
            clerkId={clerkId}
          />
        ))
      )}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
export default QuestionTab;
