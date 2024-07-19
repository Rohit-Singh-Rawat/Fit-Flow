import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar/Navbar";
import RightSidebar from "@/components/shared/RightSidebar";
import type { Metadata } from "next";
import '../../styles/prism.css'


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="background-light850_dark100  relative">
      <Navbar />
      <div className="flex  relative">
        <LeftSideBar/>
        <section className="max-md:pd-14 flex min-h-screen flex-1 flex-col xs:px-6 pb-6 pt-36 sm:px-14">
          <div className="mx-auto w-full max-w-2xl ">{children}</div>
        </section>
        <RightSidebar/>
      </div>
    </main>
  );
}
