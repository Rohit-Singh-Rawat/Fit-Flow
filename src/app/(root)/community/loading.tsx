import { Skeleton } from "@/components/ui/skeleton";

type Props = {};
const Loading = (props: Props) => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"></div>{" "}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="mt-11 flex flex-wrap gap-4">
        {Array(10)
          .fill(null)
          .map((item) => (
            <Skeleton
              key={item}
              className="rounded-2x1 h-52 w-full sm:w-[230px]"
            />
          ))}
      </div>
    </>
  );
};
export default Loading;
