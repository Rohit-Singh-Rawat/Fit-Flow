import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

type Props = {};
const Loading = (props: Props) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9 flex flex-col gap-20">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </>
  );
};
export default Loading;
