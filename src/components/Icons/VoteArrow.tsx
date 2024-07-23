import { cn } from "@/lib/utils";

type Props = { className?: string };
const VoteArrow = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 126"
      className={cn("size-10 stroke-[7px]", className)}
    >
      <path
        d="M42.5,55.6l-16.1-4.1c-2.5-0.6-3.4-3.6-1.8-5.6L60.2,3.3c2-2.3,5.6-2.3,7.5,0l35.6,42.7
				c1.6,1.9,0.7,4.9-1.8,5.6l-16.1,4.1l-5.7,69.9c0,0.6-0.5,1-1.1,1H64H49.3c-0.6,0-1-0.4-1.1-1L42.5,55.6z"
      />
    </svg>
  );
};
export default VoteArrow;
