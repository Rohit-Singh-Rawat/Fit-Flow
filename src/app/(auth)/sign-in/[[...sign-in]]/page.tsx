import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="custom-bg-gradient flex flex-col h-screen w-screen items-center justify-center">
       <div className="mb-6">
          <Image
            src="/assets/images/MainLogo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto w-48"
          />
        </div>
        <h1 className="mb-6 text-4xl font-bold text-stone-300">Welcome Back</h1>
        <SignIn />
      </div>
    
  );
}
