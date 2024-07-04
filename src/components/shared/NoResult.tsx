import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  href: string;
  label: string;
};

const NoResult = ({ title, description, href, label }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-5 text-center">
      <h2 className="h2-bold text-dark200_light900 ">{title}</h2>
      <p className="body-regular text-dark500_light700 max-w-md text-center">
        {description}
      </p>
      <Link href={href}>
        <Button className="paragraph-medium primary-light-gradient dark:primary-dark-gradient min-h-[46px] rounded-lg px-4 py-3 text-dark-100 hover:bg-light-500 dark:text-light-850 dark:hover:bg-dark-200">
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
