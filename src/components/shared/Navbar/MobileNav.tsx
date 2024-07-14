"use client";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import HamburgerIcon from "@/components/Icons/Hamburger";
import Logo from "@/components/Icons/Logo";
import MainIcon from "@/components/Icons/MainIcon";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // TODO

        return (
          <SheetClose asChild key={item.route}>
            <Link href={item.route}>
              <div
                className={`${
                  isActive
                    ? "dark:primary-dark-gradient primary-light-gradient rounded-lg dark:text-white"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 p-4`}
              >
                <item.icon
                  className={`size-6 ${isActive ? "dark:fill-light-500" : "fill-black dark:fill-white"}`}
                />
                <p className={`${isActive ? "font-bold dark:text-light-500" : "font-medium"} `}>
                  {" "}
                  {item.label}
                </p>
              </div>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="mx-2 ">
          <HamburgerIcon className="dark:fill-white sm:hidden" />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 flex h-screen flex-col justify-around border-none p-5"
      >
        <Link href="/">
          <MainIcon className="max-sm:block" />
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
