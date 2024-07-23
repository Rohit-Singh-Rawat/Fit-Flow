import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import { PaginationSection as Pagination } from "@/components/shared/Pagination";
import { PAGE_SIZE } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Fit Flow",
  description:
    "Explore fitness tags on Fit Flow. Discover popular topics, questions, and discussions related to fitness. Join the community and contribute your knowledge.",
  keywords: [
    "fitness tags",
    "popular topics",
    "Fit Flow community",
    "fitness discussions",
  ],
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const pageSize = searchParams.pageSize ? +searchParams.pageSize : PAGE_SIZE;
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: pageSize,
  });

  const tags = result?.tags ?? [];
  const totalPages = Math.ceil(result.totalTags / pageSize);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          otherClasses=""
          placeHolder="Search for tag name"
          route="/tags"
        />

        <Filter
          filters={TagFilters}
          containerClasses=""
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              href={`/tags/${tag.id}`}
              key={tag.id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 border-[#F0F0F0] dark:border-dark-300 flex w-full flex-col rounded-2xl border-2 px-8 py-10 sm:w-[233px]">
                <div className="background-light800_dark400 w-fit rounded-md px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p>{tag.description}</p>

                <p className="small-medium text-dark400_light500 mt-4">
                  <span className="body-semibold primary-text-gradient mr-2">
                    {tag._count.questions}
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            href="/questions/ask"
            label="Ask a Question"
          />
        )}{" "}
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          totalPages={totalPages}
        />
      </section>
    </>
  );
};

export default Page;
