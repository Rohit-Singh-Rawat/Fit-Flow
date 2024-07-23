"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import GlobalFilters from "./GlobalFilters";
import { toast } from "sonner";
import QuestionIcon from "@/components/Icons/QustionIcon";
import AnswerIcon from "@/components/Icons/AnswerIcon";
import UserIcon from "@/components/Icons/Usericon";
import TagIcon2 from "@/components/Icons/TagIcon2";
import Unknown from "@/components/Icons/Unknown";
import NOResult from "@/components/Icons/NOResult";
import { globalSearch } from "@/lib/actions/general.action";
import { Separator } from "@radix-ui/react-menubar";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({ query: global, type });

        setResult(res.results);
      } catch (error) {
        console.error(error);
        toast.error("failed to search, try again...");
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "answer":
        return `/questions/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl border bg-light-900 py-5 shadow-sm dark:border-light-500/10 dark:bg-dark-200">
      <GlobalFilters />
      <div className="mx-2 my-5 h-[1px] bg-light-700/80 dark:bg-dark-500/50" />

      <div className="space-y-5">
        <p className="body-medium px-5 capitalize dark:text-[#a2a69d]">
          TOP MATCH
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <Loader className="my-2 h-10 w-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-5">
            {result.length > 0 ? (
              <>
                <Separator className="h-[0.5px] w-full bg-gray-800/40 dark:bg-light-500/10" />
                {result.map((item: any, index: number) => (
                  <>
                    <Link
                      href={renderLink(item.type, item.id)}
                      key={item.type + item.id + index}
                      className="flex w-full cursor-pointer items-start gap-3 rounded-lg px-5 py-2.5 hover:bg-[#ebf1f2] dark:hover:bg-[#161918]"
                    >
                      <RenderIcon
                        type={item.type}
                        className="mt-2 size-6 fill-slate-950/50 dark:fill-white"
                      />
                      <div className="flex flex-col">
                        <p className="body-medium text-dark200_light800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-dark400_light500 small-medium mt-1 font-bold capitalize">
                          {item.type}
                        </p>
                      </div>
                    </Link>
                    <Separator className="h-[0.5px] w-full bg-gray-800/40 last-of-type:hidden dark:bg-light-500/10" />
                  </>
                ))}
              </>
            ) : (
              <div className="flex-center flex-col px-5">
                <NOResult className="size-24" />
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export const RenderIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "question":
      return <QuestionIcon className={className} />;
    case "answer":
      return <AnswerIcon className={className} />;
    case "user":
      return <UserIcon className={className} />;
    case "tag":
      return <TagIcon2 className={className} />;
    default:
      return <Unknown className={className} />;
  }
};

export default GlobalResult;
