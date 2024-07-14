import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Avatar from "./Avatar";
import { getTime } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import { Minus } from "lucide-react";

interface Props {
  questionId: string;
  userId?: string;
  page?: number;
  filter?: number;
}
const AllAnswers = async ({ questionId, userId, page, filter }: Props) => {
  const result = await getAnswers({ questionId });
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
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1 flex justify-center items-center">
                    <span className="max-sm:hidden">
                      <Minus size={8} className="mx-0.5"/>
                    </span>
                    answered {getTime(answer.createdAt)}{" "}
                  </p>
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
