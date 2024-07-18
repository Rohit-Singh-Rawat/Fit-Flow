import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { questions } = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {questions.map((question) => (
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
      ))}
    </>
  );
};
export default QuestionTab;
