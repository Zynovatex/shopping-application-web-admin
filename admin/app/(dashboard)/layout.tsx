  import "../globals.css"// Ensure correct path
  import Link from "next/link";
  import Image from "next/image";
  import Menu from "@/components/common/Menu";
  import Navbar from "@/components/common/Navbar";

  export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen flex">

              {/*Left */}
              <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
                <Link href="/admin" className="flex items-center justify-start lg:justify-start gap-2 p-4">
                {/* WHAT TO CHANGE THE LOGO CHANGE IT HERE */}
                <Image src="/logo.png" alt="logo" width={32} height={32} className="lg:hidden" />   
                <div className="hidden lg:block font-bold text-2xl px-2">
                <span className="text-[#7B5AF7]">Virtual</span>
                <span className="text-black">City</span>
                </div>
                </Link>
                <Menu/>
              </div>
              {/*Right */}
              <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll">
                <Navbar/>
                {children}
              </div>
              
              

          </div>
    );
  }

