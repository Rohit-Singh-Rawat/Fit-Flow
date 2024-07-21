import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import { PAGE_SIZE } from "@/constants";

import { PaginationSection as Pagination } from "@/components/shared/Pagination";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  const { answers ,totalAnswers} = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: pageSize,
  });
const totalPages = Math.ceil(
  totalAnswers / pageSize,
);
  return (
    <>
      {answers.length === 0 ? (
        <p>No question answered</p>
      ) : (
        answers.map((item) => (
          <AnswerCard
            key={item.id}
            clerkId={clerkId}
            id={item.id}
            question={{ title: item.question!.title, id: item.question!.id }}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
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

export default AnswersTab;
