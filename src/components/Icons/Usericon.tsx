import { cn } from "@/lib/utils";

type Props = { className?: string };
const UserIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="user"
      className={cn("size-7", className)}
    >
      <circle cx="14" cy="7" r="4" className="fill-[#8FC5F6] dark:fill-[#5efe99]"></circle>
      <path d="M12 11.75c2.619 0 4.75-2.131 4.75-4.75s-2.131-4.75-4.75-4.75-4.75 2.131-4.75 4.75 2.131 4.75 4.75 4.75zm0-8c1.792 0 3.25 1.458 3.25 3.25s-1.458 3.25-3.25 3.25-3.25-1.458-3.25-3.25 1.458-3.25 3.25-3.25zM15 13.25h-6c-3.17 0-5.75 2.58-5.75 5.75 0 1.517 1.233 2.75 2.75 2.75h12c1.517 0 2.75-1.233 2.75-2.75 0-3.17-2.58-5.75-5.75-5.75zm3 7H6c-.689 0-1.25-.561-1.25-1.25 0-2.343 1.907-4.25 4.25-4.25h6c2.343 0 4.25 1.907 4.25 4.25 0 .689-.561 1.25-1.25 1.25z"></path>
    </svg>
  );
};
export default UserIcon;
