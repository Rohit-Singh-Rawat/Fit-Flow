import { cn } from "@/lib/utils";

type Props = { className?: string };
const HamburgerIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="menu"
      className={cn("size-7", className)}
    >
      <g>
        <g>
          <rect
            width="24"
            height="24"
            opacity="0"
            transform="rotate(180 12 12)"
          ></rect>
          <circle cx="4" cy="12" r="1"></circle>
          <rect width="14" height="2" x="7" y="11" rx=".94" ry=".94"></rect>
          <rect width="18" height="2" x="3" y="16" rx=".94" ry=".94"></rect>
          <rect width="18" height="2" x="3" y="6" rx=".94" ry=".94"></rect>
        </g>
      </g>
    </svg>
  );
};
export default HamburgerIcon;
