import {  SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="custom-bg-gradient flex h-screen w-screen flex-col items-center justify-center">
      <div className="">
        <Image
          src="/assets/images/MainLogo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto w-40"
        />
      </div>
      <SignUp />
    </div>
  );
}
