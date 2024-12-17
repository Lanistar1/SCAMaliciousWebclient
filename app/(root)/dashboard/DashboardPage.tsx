"use client";
import React, { useEffect, useState } from "react";
import LineChart from "@/app/components/linechart";
import UserEngagement from "@/app/components/UserEngagement";
import {
  useFetchDashboard,
  useFetchDashboardGraph,
} from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import AppRating from "./AppRating";

const DashboardPage = () => {
  const { token } = useAuthContext();
  const [shouldFetchGraph, setShouldFetchGraph] = useState(false);

  // fetch data for graph
  const {
    data: contentGraph,
    isLoading: isGraphLoading,
    isError: isGraphError,
    refetch
  } = useFetchDashboardGraph(token);

  // Fetch dashboard data
  const {
    data: content,
    isLoading: isContentLoading,
    isError: isContentError,
    isSuccess: isContentSuccess,
  } = useFetchDashboard(token);

  

  useEffect(() => {
    refetch();
  }, [isContentSuccess]);

  // Extract data safely
  const data = content?.data || [];
  const ageData = content?.data?.getUserDemographics || [];
  const appRatings = content?.data?.finalRating || [];
  const finalGraphData = contentGraph?.data?.finalGraph || [];

  // Process graph data for LineChart
  const graphData = finalGraphData.map((item: any) => ({
    x: item.month, // Month as x-axis
    experienceCount: item.experienceCount,
    reportedExperienceCount: item.reportedExperienceCount,
    usersCount: item.usersCount,
  }));

  return (
    <div className="flex flex-col items-center px-4 md:px-12 pt-12 space-y-8 bg-gray-100 ml-10">
      <header className="flex justify-between items-center w-full max-w-screen-lg">
        <div className="text-[14px] text-center border-b border-[#A52A2A] items-center w-[100px] h-[30px]">
          Dashboard
        </div>
        <div className="flex items-center space-x-4"></div>
      </header>

      {/* Overall Loading/Error States */}
      {(isContentLoading || isGraphLoading) && <p>Loading...</p>}
      {(isContentError || isGraphError) && <p>Error loading data</p>}

      {!isContentLoading && !isContentError && (
        <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
            <p className="text-[#1C1C1C] font-normal text-[13px] text-center">
              Total Reported Content
            </p>
            <p className="text-[#1C1C1C] font-semibold text-[16px] text-center">
              {data.allReportedExperienceCount}
            </p>
          </div>
          <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
            <p className="text-[#1C1C1C] font-normal text-[13px] text-center">
              Total Pending Reports
            </p>
            <p className="text-[#1C1C1C] font-semibold text-[16px] text-center">
              {data.pendingReportedExperienceCount}
            </p>
          </div>
          <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
            <p className="text-[#1C1C1C] font-normal text-[14px] text-center">
              Total Users
            </p>
            <p className="text-[#1C1C1C] font-semibold text-[16px] text-center">
              {data.allUserCount}
            </p>
          </div>
          <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
            <p className="text-[#1C1C1C] font-normal text-[14px] text-center">
              Total Contents
            </p>
            <p className="text-[#1C1C1C] font-semibold text-[16px] text-center">
              {data.allExperienceCount}
            </p>
          </div>
        </div>
      )}

      {/* App Ratings */}
      {!isContentLoading && !isContentError && (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-20">
          <div className="w-full md:w-[780px] h-[300px]">
            <AppRating data={appRatings} />
          </div>
          <UserEngagement data={ageData} />
        </div>
      )}

      {/* Graph and Engagement */}
      {!isGraphLoading && !isGraphError && (
        <div className="w-full md:w-[1020px] h-[300px]">
          <LineChart graphData={graphData} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
