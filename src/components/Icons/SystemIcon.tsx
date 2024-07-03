import { cn } from "@/lib/utils";

type Props = {className?: string};
const SystemIcon = ({className}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46 46"
      id="desktop"
      className={cn("size-7", className)}
    >
      <path
        d="M7 7v25h15v5h-8v2h18v-2h-8v-5h10a5 5 0 0 0 5-5V7Zm30 20a3 3 0 0 1-3 3H9V9h28Z"
      ></path>
      <path  d="M12 23h6v2h-6z"></path>
    </svg>
  );
}
export default SystemIcon