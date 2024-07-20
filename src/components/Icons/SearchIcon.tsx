import { cn } from "@/lib/utils";

type Props = { className?: string };
const SearchIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      id="search"
      className={cn("size-7", className)}
    >
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          d="M14.5 9C11.6714 9 9.26239 10.8073 8.3696 13.3332C8.18555 13.854 7.61423 14.1269 7.09351 13.9428C6.5728 13.7588 6.29987 13.1875 6.48392 12.6668C7.65031 9.36672 10.7975 7 14.5 7C19.1944 7 23 10.8056 23 15.5C23 17.2026 22.4994 18.7882 21.6374 20.1178L25.6139 23.2106C26.0499 23.5497 26.1284 24.178 25.7894 24.6139C25.4503 25.0499 24.822 25.1284 24.3861 24.7894L20.3595 21.6576C18.8347 23.1091 16.7714 24 14.5 24C11.2368 24 8.40478 22.1609 6.98096 19.4673C6.72286 18.9791 6.90945 18.374 7.39771 18.1159C7.88598 17.8578 8.49102 18.0444 8.74912 18.5327C9.84029 20.5969 12.0071 22 14.5 22C18.0898 22 21 19.0899 21 15.5C21 11.9101 18.0898 9 14.5 9ZM8 16C8 16.5523 7.55228 17 7 17C6.44772 17 6 16.5523 6 16C6 15.4477 6.44772 15 7 15C7.55228 15 8 15.4477 8 16Z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="32" height="32" fill="#fff"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};
export default SearchIcon;
