"use client";

import { sidebarLinks } from "@/constants";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import SignInIcon from "../Icons/SignInIcon";
import SignUpIcon from "../Icons/SignUpIcon";

type Props = {};
const LeftSideBar = (props: Props) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section className="sticky right-0 top-0 flex h-screen sm:p-5 sm:pt-[100px]">
      <div className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex flex-col justify-between overflow-y-auto rounded-2xl border-r p-3 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] lg:p-6">
        <div className="flex flex-col gap-6">
          {sidebarLinks.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;

            if (item.route === "/profile") {
              if (userId) {
                item.route = `${item.route}/${userId}`;
              } else {
                return null;
              }
            }

            return (
              <div key={item.route}>
                <Link href={item.route}>
                  <div
                    className={`${
                      isActive
                        ? "dark:primary-dark-gradient primary-light-gradient rounded-lg dark:text-white dark:hover:bg-dark-300/50"
                        : "text-dark300_light900"
                    } flex items-center justify-center gap-4 p-4 lg:justify-start`}
                  >
                    <item.icon
                      className={`size-6 ${isActive ? "dark:fill-light-500" : "dark:fill-white"}`}
                    />
                    <p
                      className={`${isActive ? "font-semibold dark:text-light-500" : "text-[ font-medium"} max-lg:hidden`}
                    >
                      {item.label}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>{" "}
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <SignInIcon className="md:hidden" />
                <span className="primary-text-gradient max-md:hidden">
                  Log In
                </span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light400 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <SignUpIcon className="md:hidden" />
                <span className="primary-text-gradient max-md:hidden">
                  Sign Up
                </span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};
export default LeftSideBar;
