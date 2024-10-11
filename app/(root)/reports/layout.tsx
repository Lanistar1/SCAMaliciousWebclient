import UserHeader from "@/app/components/UserHeader";
import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="relative flex flex-col h-screen w-screen">
        <UserHeader title={'Report'}/>
        {children}
        {/* <div className="absolute bottom-0 right-0 p-4">
          <Image src="/assets/images/logofaint.png" alt="image"  width={84} height={92} className=" -z-10" />
        </div> */}
      </main>
    );
  }
  
