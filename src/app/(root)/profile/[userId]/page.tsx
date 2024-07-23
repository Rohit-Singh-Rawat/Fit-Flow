import AnswersTab from "@/components/shared/AnswersTab";
import NoResult from "@/components/shared/NoResult";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CalendarDays, Link2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import TopTags from "@/components/shared/TopTags";
type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.userId;

  const { user: userInfo } = await getUserInfo({
    userId: params.userId,
  });
  if (!userInfo) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `User ${userInfo?.name} |fit flow`,
    description: `View ${userInfo?.name}'s profile on Fit Flow. Explore their fitness journey, questions asked, answers provided, and contributions to the community. Connect with ${userInfo?.name} and discover their insights into workouts, nutrition, and more.`,
    keywords: [
      `${userInfo?.name} profile`,
      "fitness journey",
      "workouts",
      "nutrition",
      "Fit Flow community",
    ],
  };
}
const page = async ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId: clerkId } = auth();
  const { user: userInfo, badgeCounts } = await getUserInfo({
    userId: params.userId,
  });
  if (!userInfo) {
    return (
      <NoResult
        title={`No User found`}
        description={`No User found with the id ${params.userId}`}
        href="/"
        label="home"
      />
    );
  }
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.name}</h2>
            <p className="paragraph-regular text-blue_light500">
              @{userInfo.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.portfolioWebsite && (
                <ProfileLink
                  icon=<Link2 size="20" />
                  href={userInfo.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {userInfo.location && (
                <ProfileLink
                  icon=<MapPin size="20" />
                  title={userInfo.location}
                />
              )}

              <ProfileLink
                icon=<CalendarDays size="20 " />
                title={getJoinedDate(userInfo.joinedAt)}
              />
            </div>

            {userInfo.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        reputation={userInfo.reputation}
        totalQuestions={userInfo._count.authoredQuestions}
        totalAnswers={userInfo._count.authoredAnswers}
        badges={badgeCounts}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="inline-flex min-h-[42px] rounded-lg bg-light-900 p-1 dark:bg-dark-400">
            <TabsTrigger value="top-posts" className="tab rounded-lg px-4 py-1">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab rounded-lg px-4 py-1">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
        <TopTags userId={userInfo.id} />
      </div>
    </>
  );
};
export default page;
