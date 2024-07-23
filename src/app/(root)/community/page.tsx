import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { PaginationSection as Pagination } from "@/components/shared/Pagination";
import { PAGE_SIZE } from "@/constants";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Fit Flow",
  description:
    "Explore profiles of fitness enthusiasts on Fit Flow. Discover users who contribute valuable fitness-related content, ask questions, and share their expertise. Connect with like-minded individuals and grow your fitness network.",
  keywords: [
    "fitness enthusiasts",
    "user profiles",
    "Fit Flow community",
    "fitness network",
  ],
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: pageSize,
  });
  const totalPages = Math.ceil(result.totalUsers / pageSize);

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          otherClasses=""
          placeHolder="Search for users"
          route="/community"
        />
        <Filter
          filters={UserFilters}
          containerClasses=""
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>{" "}
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard user={user}  key={user.id} />)
        ) : (
          <NoResult
            description="No users found with these search"
            href="/sign-up"
            title="No users yet"
            label="Be the first"
          />
        )}
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            totalPages={totalPages}
          />
        </div>
      </section>
    </>
  );
};
export default page;
