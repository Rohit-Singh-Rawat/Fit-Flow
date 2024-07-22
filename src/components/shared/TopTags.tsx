import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import { getToptags, getUserQuestions } from "@/lib/actions/user.action";
import { PAGE_SIZE } from "@/constants";

import { PaginationSection as Pagination } from "@/components/shared/Pagination";
import RenderTag from "./RenderTag";
interface Props {
  userId: string;
}

const TopTags = async ({ userId }: Props) => {
  const topTags = await getToptags({
    userId,
  });
  return (
    <div className="flex min-w-[250px] flex-col max-lg:hidden">
      <h2 className="h2-bold text-dark100_light900 mb-10">Top Tags</h2>
      <div className="flex flex-col gap-5 justify-center">
        {topTags.length === 0 ? (
          <p>No Tags associated</p>
        ) : (
          topTags.map((tag) => (
            <RenderTag
              key={tag.id}
              _id={tag.id}
              name={tag.name}
              totalQuestions={tag.count}
              showCount
            />
          ))
        )}
      </div>
    </div>
  );
};
export default TopTags;
