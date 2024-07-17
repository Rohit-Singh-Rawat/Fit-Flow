import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { QuestionFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};
const page = async (props: Props) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-in");
  }
  const result = await getSavedQuestion({ clerkId });
  const savedQuestions = result?.savedQuestions ?? [];

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          otherClasses=""
          placeHolder="Search for questions"
          route="/"
        />
        <Filter
          filters={QuestionFilters}
          containerClasses="hidden max-md:flex "
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>{" "}
      <div className="mt-10 flex w-full flex-col gap-6 overflow-hidden">
        {savedQuestions?.length > 0 ? (
          savedQuestions?.map((question) => (
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
            />
          ))
        ) : (
          <NoResult
            title="No Saved Questions"
            description="It looks like there are no saved questions to display right now. "
            href="/questions/ask"
            label="Ask a Question"
          />
        )}
      </div>
    </>
  );
};
export default page;
