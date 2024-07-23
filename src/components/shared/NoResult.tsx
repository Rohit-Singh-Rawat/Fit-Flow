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
      <SvgNoResult />
      <h2 className="h2-bold text-dark200_light900">{title}</h2>
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

const SvgNoResult = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 32 32"
    className="size-32 fill-black dark:fill-white"
  >
    <circle cx="14" cy="14" r="13" className="fill-white dark:fill-black" />
    <path d="M22.456,23.966l6.837,6.837c0.39,0.39 1.024,0.39 1.414,-0c0.39,-0.39 0.39,-1.024 0,-1.414l-6.836,-6.837c1.95,-2.273 3.129,-5.228 3.129,-8.456c-0,-7.175 -5.825,-13 -13,-13c-7.175,-0 -13,5.825 -13,13c-0,7.175 5.825,13 13,13c3.228,-0 6.183,-1.179 8.456,-3.13Zm-8.456,-20.87c6.071,-0 11,4.929 11,11c-0,6.071 -4.929,11 -11,11c-6.071,-0 -11,-4.929 -11,-11c-0,-6.071 4.929,-11 11,-11Z" />
    <path d="M8 11.51l-.707.707c-.39.39-.39 1.024 0 1.414.39.391 1.024.391 1.414 0l.707-.707.707.707c.391.391 1.024.391 1.415 0 .39-.39.39-1.024 0-1.414l-.708-.707.708-.707c.39-.39.39-1.024 0-1.414-.391-.391-1.024-.391-1.415 0l-.707.707-.707-.707c-.39-.391-1.024-.391-1.414 0-.39.39-.39 1.024 0 1.414l.707.707zM16.5 11.51l-.707.707c-.39.39-.39 1.024 0 1.414.39.391 1.024.391 1.414 0l.707-.707.707.707c.391.391 1.024.391 1.415 0 .39-.39.39-1.024 0-1.414l-.708-.707.708-.707c.39-.39.39-1.024 0-1.414-.391-.391-1.024-.391-1.415 0l-.707.707-.707-.707c-.39-.391-1.024-.391-1.414 0-.39.39-.39 1.024 0 1.414l.707.707zM10.669 19.839c.943-.849 1.872-1.277 2.815-1.262.963.015 1.912.481 2.875 1.286.423.354 1.054.297 1.408-.126.354-.424.298-1.055-.126-1.409-1.37-1.145-2.755-1.729-4.125-1.751-1.39-.022-2.795.524-4.185 1.775-.41.37-.443 1.003-.074 1.413.369.41 1.002.443 1.412.074z" />
  </svg>
);

export default NoResult;
