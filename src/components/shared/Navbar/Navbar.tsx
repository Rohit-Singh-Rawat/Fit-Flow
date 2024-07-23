import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import MainIcon from "@/components/Icons/MainIcon";
import Logo from "@/components/Icons/Logo";

type Props = {};
const Navbar = (props: Props) => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-2 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={"/"} className="flex items-center gap-1">
        <MainIcon />
        <Logo />
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          {" "}
          <UserButton />{" "}
        </SignedIn>
        <SignedOut>
          <SignInButton
            children={
              <button className="btn-tertiary rounded-lg border border-zinc-200 dark:border-zinc-800 px-6 py-2 font-semibold text-orange-400">
                SignIn
              </button>
            }
          />
        </SignedOut>
        <MobileNav />
      </div>
    </nav>
  );
};
export default Navbar;
