import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode; 
  value: string | number; 
  title: string; 
  textStyles?: string
};

const Metric = ({ icon, value, title, textStyles }: Props) => {
  return (
    <div className="flex-center flex-wrap gap-2">
      {icon} 
      <p className={cn("flex items-center gap-", textStyles)}>
        {value} {title}
      </p>
    </div>
  );
};

export default Metric;
