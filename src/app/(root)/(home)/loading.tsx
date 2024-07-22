import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import Link from "next/link";

type Props = {};
const Loading = (props: Props) => {
  return (
    <section>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={"/questions/ask"}
          className="justify-end max-sm:w-full sm:flex"
        >
          <Button className="inline-flex h-12 min-h-[46px] animate-shimmer items-center justify-center rounded-lg border border-blue-600 bg-light-gradient bg-[length:200%_100%] px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-[#282626] dark:bg-dark-gradient dark:text-light-900 dark:ring-offset-[#1a4334] dark:hover:bg-dark-200 dark:focus:ring-[#0e2618]">
            {" "}
            Ask a question
          </Button>{" "}
        </Link>
      </div>
      <div className="my-11 flex mt-11 justify-between gap-5 max-sm:flex-col sm:items-center md:mt-11">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          {" "}
          <Skeleton className="h-14 w-28 " />
        </div>
      </div>{" "}
      <div className="my-10 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="flex flex-col gap-6">
        {Array(10)
          .fill(null)
          .map((item) => (
            <Skeleton key={item} className="h-48 w-full rounded-xl" />
          ))}
      </div>
    </section>
  );
};
export default Loading;
