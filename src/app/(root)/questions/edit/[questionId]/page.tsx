import Question from "@/components/forms/Question";
import NoResult from "@/components/shared/NoResult";
import { getQuestionById } from "@/lib/actions/question.action";
import { Question as QuestionProps } from "@/lib/actions/shared.types";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit a question| Fit Flow",
};
type Props = { params: { questionId: string } };

const Page = async ({ params }: Props) => {
  const { userId: clerkId } = auth();
  let user: User | null = null;

  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }
  if (!clerkId || !user) {
    redirect("/sign-in");
  }

  const { questionId } = params;
  const result = await getQuestionById({ questionId });
  const question: QuestionProps | null = result?.question || null;
  if (!question) {
    return (
      <NoResult
        title={`Question ID ${questionId} Not Found`}
        description={`We couldn't find the question with ID ${questionId}. Please try searching for another question or ask a new one.`}
        href="/questions/ask"
        label="Ask a Question"
      />
    );
  }

  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">Edit</h1>
      <div className="mt-9">
        <Question userId={user.id} type="Edit" questionDetails={question} />
      </div>
    </div>
  );
};

export default Page;
