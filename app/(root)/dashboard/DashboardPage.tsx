"use client";
import React, { useEffect, useState } from "react";
import LineChart from "@/app/components/linechart";
import UserEngagement from "@/app/components/UserEngagement";
import { useAuthContext } from "@/app/context/AuthContext";
import AppRating from "./AppRating";
import { useRouter } from "next/navigation"; 


const DashboardPage = () => {
  const { token } = useAuthContext();
  const router = useRouter(); 
  const [content, setContent] = useState<any>(null);
  const [contentGraph, setContentGraph] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  ); // State for selected year
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Redirect to /sign-in if there's no token
  useEffect(() => {
    if (!token) {
      router.push("/sign-in"); // Redirect if token is missing
    }
  }, [token, router]);

  // Function to fetch graph data based on the selected year
  const fetchGraphData = async (year: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/dashboard/graph?year=${year}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch graph data");
      }

      const graphData = await response.json();
      setContentGraph(graphData);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching graph data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial dashboard data fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const dashboardResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!dashboardResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const dashboardData = await dashboardResponse.json();
        setContent(dashboardData);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
    fetchGraphData(selectedYear); // Fetch graph data for the initial year
  }, [token]);

  // Re-fetch graph data when the selected year changes
  useEffect(() => {
    fetchGraphData(selectedYear);
  }, [selectedYear]);

  // Extract data safely
  const data = content?.data || {};
  const ageData = content?.data?.getUserDemographics || [];
  const appRatings = content?.data?.finalRating || [];
  const finalGraphData = contentGraph?.data?.finalGraph || [];

  // Process graph data for LineChart
  const graphData = finalGraphData.map((item: any) => ({
    x: item.month,
    experienceCount: item.experienceCount,
    reportedExperienceCount: item.reportedExperienceCount,
    usersCount: item.usersCount,
  }));

  return (
    <div className="flex flex-col items-center px-4 md:px-12 pt-12 space-y-8 bg-gray-100 ml-1">
      <header className="flex justify-between items-center w-full max-w-screen-lg">
        <div className="text-[14px] text-center border-b border-[#A52A2A] items-center w-[100px] h-[30px]">
          Dashboard
        </div>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}

      {!isLoading && !isError && content && contentGraph && (
        <>
          <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-5 gap-4">
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
                Pending Reported Content
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
            <div className="flex flex-col rounded-xl bg-[#EEE9ED] p-6 space-y-3">
              <p className="text-[#1C1C1C] font-normal text-[14px] text-center">
                Pending Contents
              </p>
              <p className="text-[#1C1C1C] font-semibold text-[16px] text-center">
                {data.pendingExperienceCount}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
            <div className="w-full md:w-[750px] md:h-[300px]">
              <AppRating data={appRatings} />
            </div>
            <UserEngagement data={ageData} />
          </div>

          {/* Graph Filtered by Year */}
          <div className="w-full md:w-[900px] xl:w-[1010px] h-[300px]">
            <div className="w-full max-w-xs mt-10 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Year to filter graph
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))} // Update state on change
              >
                <option value="">--Select Year--</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const currentYear = new Date().getFullYear();
                  const year = currentYear - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <LineChart graphData={graphData} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
