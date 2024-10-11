"use client";
import React from "react";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <div>
      <header className="flex justify-between items-center px-12 pt-12">
        <div className="text-[14px] text-center border-b border-[#A52A2A] items-center w-[79px] h-[29px]">
          Dashboard
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
      <div className="relative flex flex-row mx-12 mt-4">
        <div className="relative flex flex-col w-[75%] mr-10">
          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-col rounded-xl bg-[#EEE9ED] w-full p-4 space-y-3">
              <p className="text-[#1C1C1C] font-normal text-[12px]">
                Total Reports
              </p>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[#1C1C1C] font-semibold text-[13px]">
                  3,361
                </p>
                <p className="text-[#1C1C1C] font-normal text-[12px]">-0.03%</p>
              </div>
            </div>
            <div className="flex flex-col rounded-xl bg-[#EEE9ED] w-full p-4 space-y-3">
              <p className="text-[#1C1C1C] font-normal text-[12px]">
                New Users
              </p>
              <div className="flex flex-row justify-between items-center ">
                <p className="text-[#1C1C1C] font-semibold text-[13px]">561</p>
                <p className="text-[#1C1C1C] font-normal text-[12px]">
                  +15.03%
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-[#EEE9ED] w-full p-4 space-y-3 mt-4">
            <div className="flex flex-row justify-between items-center  ">
              <p className="text-[#1C1C1C] font-normal text-[12px]">
                App Rating
              </p>
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

          <div className="flex flex-row items-center space-x-4 mt-5 mr-4">
            <Image
              src="/assets/images/graph.png" // Replace with your logo path
              width={500}
              height={400}
              alt="Logo"
              className="w-[65%]"
            />
            <Image
              src="/assets/images/userEngagement.png" // Replace with your logo path
              width={315}
              height={450}
              alt="Logo"
            />
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/RightBar.png" // Replace with your logo path
            width={200}
            height={240}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
