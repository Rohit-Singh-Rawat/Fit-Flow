import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

type Props = {};
const page = async (props: Props) => {
  const result = await getAllUsers({});

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
       
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          otherClasses=""
          placeHolder="Search for questions"
          route="/"
        />
        <Filter
          filters={UserFilters}
          containerClasses=""
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>{" "}
      <section className="mt-12  flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard user={user} key={user.id} />)
        ) : (
          <NoResult
            description="No users yet"
            href="/sign-up"
            title="No users yet"
            label="Be the first"
          />
        )}
      </section>
    </>
  );
};
export default page;
