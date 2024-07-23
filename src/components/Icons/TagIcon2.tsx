import { cn } from "@/lib/utils";

type Props = { className?: string };
const TagIcon2 = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("size-7", className)}
    >
      <path d="M20.681 13.243a3 3 0 0 0 .87-2.351l-.404-5.253a3 3 0 0 0-2.761-2.76l-5.253-.405a3 3 0 0 0-2.351.87l-7.51 7.51a3 3 0 0 0 0 4.242l5.657 5.657a3 3 0 0 0 4.242 0l7.51-7.51Z" />
      <path
        className="fill-[#9F9F9F] dark:fill-black"
        d="M14.586 7.318a1.5 1.5 0 1 0 2.121 2.121 1.5 1.5 0 0 0-2.121-2.121Z"
      />
      <path
        className="fill-[#9F9F9F] dark:fill-black"
        fillRule="evenodd"
        d="m7.515 13.682 2.828 2.828a1 1 0 0 0 1.414-1.414L8.93 12.268a1 1 0 0 0-1.414 1.414Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default TagIcon2;
