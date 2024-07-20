import { cn } from "@/lib/utils";

type Props = { className?: string };
const SignUpIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      fill="none"
      viewBox="0 0 128 128"
      id="add-user"
      className={cn("size-7 stroke-black dark:stroke-white", className)}
    >
      <path
        strokeLinecap="round"
        strokeWidth="6"
        d="M81 66L75.9552 68.374C68.3819 71.9379 59.615 71.9445 52.0363 68.392L48.7432 66.8484C40.9487 63.1947 32 68.883 32 77.4914V77.4914C32 90.4748 42.5252 101 55.5086 101H64C67.5 101 72 101.5 77 100.5M74 88H102M88 102L88 74"
      ></path>
      <circle cx="64" cy="42" r="16" strokeWidth="6"></circle>
    </svg>
  );
};
export default SignUpIcon;
