"use client";
import React from "react";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="relative flex flex-col h-full w-screen m-12">
      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-col rounded-xl bg-[#EEE9ED] w-96 p-4 space-y-3">
          <p className="text-[#1C1C1C] font-normal text-[12px]">
            Total Reports
          </p>
          <div className="flex flex-row justify-between items-center">
            <p className="text-[#1C1C1C] font-semibold text-[13px]">3,361</p>
            <p className="text-[#1C1C1C] font-normal text-[12px]">-0.03%</p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-[#EEE9ED] w-96 p-4 space-y-3">
          <p className="text-[#1C1C1C] font-normal text-[12px]">New Users</p>
          <div className="flex flex-row justify-between items-center ">
            <p className="text-[#1C1C1C] font-semibold text-[13px]">561</p>
            <p className="text-[#1C1C1C] font-normal text-[12px]">+15.03%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-[#EEE9ED] max-w-3xl p-4 space-y-3 mt-4">
        <div className="flex flex-row justify-between items-center  ">
          <p className="text-[#1C1C1C] font-normal text-[12px]">App Rating</p>
          <p className="text-[#1C1C1C] font-normal text-[12px] ">
            Playstore & Appstore
          </p>
        </div>

        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-start ">
            <Image
              src="/assets/images/star.png" // Replace with your logo path
              width={24}
              height={24}
              alt="Logo"
            />
            <Image
              src="/assets/images/star.png" // Replace with your logo path
              width={24}
              height={24}
              alt="Logo"
            />
            <Image
              src="/assets/images/star.png" // Replace with your logo path
              width={24}
              height={24}
              alt="Logo"
            />
            <Image
              src="/assets/images/star.png" // Replace with your logo path
              width={24}
              height={24}
              alt="Logo"
            />
            <Image
              src="/assets/images/star.png" // Replace with your logo path
              width={24}
              height={24}
              alt="Logo"
            />
          </div>
          <p className="text-[#1C1C1C] font-normal text-[12px]">
            Goto Playstore
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-4 mt-10">
        <Image
          src="/assets/images/graph.png" // Replace with your logo path
          width={500}
          height={400}
          alt="Logo"
        />
        <Image
          src="/assets/images/userEngagement.png" // Replace with your logo path
          width={250}
          height={400}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
