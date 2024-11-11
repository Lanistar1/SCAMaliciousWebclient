// pages/dashboard.js
"use client";
import React from "react";
import LineChart from "@/app/components/linechart";

const DashboardPage = () => {
  return (
    <div className=" flex flex-col items-center px-4 md:px-12 pt-12 space-y-8 bg-gray-100 ml-10">
      <header className="flex justify-between items-center w-full max-w-screen-lg">
        <div className="text-[14px] text-center border-b border-[#A52A2A] items-center w-[100px] h-[30px]">
          Dashboard
        </div>
        <div className="flex items-center space-x-4">
          {/* Placeholders for icons */}
        </div>
      </header>

      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
          <p className="text-[#1C1C1C] font-normal text-[14px]">
            Total Reports
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[#1C1C1C] font-semibold text-[16px]">3,361</p>
            <p className="text-[#1C1C1C] font-normal text-[14px]">-0.03%</p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
          <p className="text-[#1C1C1C] font-normal text-[14px]">New Users</p>
          <div className="flex justify-between items-center">
            <p className="text-[#1C1C1C] font-semibold text-[16px]">561</p>
            <p className="text-[#1C1C1C] font-normal text-[14px]">+15.03%</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[900px] h-[300px] ">
        <LineChart />
      </div>
    </div>
  );
};

export default DashboardPage;
