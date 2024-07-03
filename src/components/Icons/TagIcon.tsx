import { cn } from "@/lib/utils";

type Props = { className?: string };
const TagIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35"
      id="tag"
      className={cn("size-7 fill-black dark:fill-white", className)}
    >
      <path d="M18.77,34.75A5.33,5.33,0,0,1,15,33.21L1.79,20A5.39,5.39,0,0,1,.26,15.87l.57-9.2A6.3,6.3,0,0,1,6.67.83l9.2-.57A5.44,5.44,0,0,1,20,1.79L33.21,15a5.79,5.79,0,0,1-.31,8.16h0L23.13,32.9A6.16,6.16,0,0,1,18.77,34.75Zm-2.54-32H16l-9.21.56a3.83,3.83,0,0,0-3.5,3.5L2.76,16a2.85,2.85,0,0,0,.8,2.24L16.74,31.44a2.9,2.9,0,0,0,2.19.81,3.69,3.69,0,0,0,2.43-1.12l9.78-9.77a3.3,3.3,0,0,0,.3-4.62L18.26,3.56A2.81,2.81,0,0,0,16.23,2.75ZM32,22.25h0Z"></path>
      <path d="M11.48,15.73a4.25,4.25,0,0,1-4.25-4.25,4.25,4.25,0,0,1,7.26-3,4.25,4.25,0,0,1-3,7.25Zm0-6a1.75,1.75,0,0,0-1.24,3,1.8,1.8,0,0,0,2.48,0,1.76,1.76,0,0,0,0-2.48h0A1.74,1.74,0,0,0,11.48,9.73Z"></path>
    </svg>
  );
};
export default TagIcon;