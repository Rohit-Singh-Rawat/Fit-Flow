import { Loader } from "lucide-react";

type Props = {};
const Loading = (props: Props) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader className="animate-spin size-20 stroke-white"/>
    </div>
  );
};
export default Loading;
