import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
type Props = {
  containerClasses: string;
  otherClasses: string;
  filter: { value: string; name: string }[];
};
export default function Filter({
  containerClasses,
  filter,
  otherClasses,
}: Props) {
  return (
    <div className={cn("relative", containerClasses)}>
      <Select>
        <SelectTrigger
          className={cn(
            "body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5",
            otherClasses,
          )}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="light-border background-light800_dark300 text-dark500_light700">
          <SelectGroup>
            {filter.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="rounded-md hover:bg-light-900 dark:hover:bg-dark-500"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
