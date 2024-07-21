import { getCompactNumber } from "@/lib/utils";
import { ReactNode } from "react";
import GoldMedal from "../Icons/GoldMedal";
import SilverMedal from "../Icons/SilverMedal";
import BronzeMedal from "../Icons/BronzeMedal";
import { BadgeCounts } from "@/types";

type Props = {
  totalQuestions: number;
  totalAnswers: number;
  reputation: number;
  badges:BadgeCounts
};
const Stats = ({ badges, reputation, totalAnswers, totalQuestions }: Props) => {
  return (
    <div className="mt-10">
      <h3 className="h3-semibold text-dark200_light900">
        stats - <span className="font-medium text-dark-300 dark:text-light-500 ">{reputation}</span>
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {getCompactNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400 light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {getCompactNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400 light700">Answers</p>
          </div>
        </div>
        <StatsCard
          icon=<GoldMedal className="size-20" />
          value={badges.GOLD}
          title="Gold Badges"
        />

        <StatsCard
          icon=<SilverMedal className="size-20" />
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          icon=<BronzeMedal className="size-20" />
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};
interface StatsCardProps {
  icon: ReactNode;
  value: number;
  title: string;
}

const StatsCard = ({ icon, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      {icon}
      <div>
        <p className="paragraph-semibold text-dark200_light900">
          {getCompactNumber(value)}
        </p>
        <p className="body-medium text-dark400 light700">{title}</p>
      </div>
    </div>
  );
};
export default Stats;
