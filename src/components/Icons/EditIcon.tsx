import { cn } from "@/lib/utils";

type Props = { className?: string };
const EditIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 70 70"
      className={cn("size-7", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M33.5 51.5h19M19 43.86l-.9 7.3 7.3-1L49.61 26a3 3 0 0 0 .1-4.2l-.1-.1-2.1-2.1a3 3 0 0 0-4.2-.1l-.1.1zm21.81-21 2 2"
      />
    </svg>
  );
};
export default EditIcon;
