import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a question| Fit Flow",

};
type Props = {};
const page = async (props: Props) => {
  const {userId} = auth()

  if (!userId) redirect('/sign-in')
    const user = await getUserById({userId})
  if(!user)
     redirect('/sign-in')
  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question userId={user.id}/> 
      </div>
    </div>
  );
};
export default page;
