import React from "react";
import Image from "next/image";

const UserHeader = ({ title }: { title: string }) => {
  return (
    <header className="flex justify-between items-center px-12 pt-12">
      <div className="text-[14px] text-center border-b border-[#A52A2A] items-center w-[79px] h-[29px]">
        {title}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex bg-white w-[50px] h-[48px] justify-center items-center rounded-xl ">
          <Image
            src="/assets/icons/Group 3.png"
            alt="Bell Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="flex bg-white w-[50px] h-[48px] justify-center items-center rounded-xl ">
          <Image
            src="/assets/icons/Group 3.png"
            alt="Bell Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
