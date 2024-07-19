import { Loader } from "lucide-react";

type Props = {};
const Loading = (props: Props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="size-20 animate-spin stroke-black dark:stroke-white" />
    </div>
  );
};
export default Loading;
