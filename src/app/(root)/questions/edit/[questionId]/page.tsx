
import Question from "@/components/forms/Question";
import NoResult from "@/components/shared/NoResult";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type User = {
  id: string;
  name: string;
  clerkId: string;
  username: string;
  email: string;
  password: string | null;
  bio: string | null;
  picture: string;
  location: string | null;
  portfolioWebsite: string | null;
  reputation: number;
  joinedAt: Date;
  savedQuestions: {
    id: string;
    title: string;
    content: string;
    views: number;
    authorId: string;
    createdAt: Date;
  }[];
};

export type Question = {
  id: string;
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    clerkId: string;
    picture: string;
  };
  tags: { id: string; name: string }[];
  upvotes: { id: string }[];
  downvotes: { id: string }[];
  answers: { id: string }[];
};

type Props = { params: { questionId: string } };

const Page = async ({ params }: Props) => {
  const { userId: clerkId } = auth();
  let user: User | null = null;

  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }
  if(!clerkId || !user){
    redirect('/sign-in')
  }

  const { questionId } = params;
  const result = await getQuestionById({ questionId });
  const question: Question | null = result?.question || null;
  if (!question) {
    return (
      <NoResult
        title={`Question ID ${questionId} Not Found`}
        description={`We couldn't find the question with ID ${questionId}. Please try searching for another question or ask a new one.`}
        href="/ask"
        label="Ask a Question"
      />
    );
  }

  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">Edit</h1>
      <div className="mt-9">
        <Question userId={user.id} type='Edit' questionDetails={question}/>
      </div>
    </div>
  );
};

export default Page;
