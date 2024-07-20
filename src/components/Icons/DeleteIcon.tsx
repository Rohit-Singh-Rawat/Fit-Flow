import { cn } from "@/lib/utils";

type Props = { className?: string };
const DeleteIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("size-7", className)}
    >
      <path
        fillRule="evenodd"
        d="M8.5 4C8.5 3.17157 9.17157 2.5 10 2.5H14C14.8284 2.5 15.5 3.17157 15.5 4V4.5H20C20.2761 4.5 20.5 4.72386 20.5 5C20.5 5.27614 20.2761 5.5 20 5.5H18.5V19.5C18.5 20.8807 17.3807 22 16 22H8C6.61929 22 5.5 20.8807 5.5 19.5V8C5.5 7.72386 5.72386 7.5 6 7.5C6.27614 7.5 6.5 7.72386 6.5 8V19.5C6.5 20.3284 7.17157 21 8 21H16C16.8284 21 17.5 20.3284 17.5 19.5V5.5H15C14.7239 5.5 14.5 5.27614 14.5 5V4C14.5 3.72386 14.2761 3.5 14 3.5H10C9.72386 3.5 9.5 3.72386 9.5 4V5C9.5 5.27614 9.27614 5.5 9 5.5H4C3.72386 5.5 3.5 5.27614 3.5 5C3.5 4.72386 3.72386 4.5 4 4.5H8.5V4Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default DeleteIcon;
