"use client ";
import React, { useState, useEffect } from "react";
import ContentInfo from "./ContentInfo";
import Image from "next/image";
import { useExperience } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import useDebounce from "@/app/actions/debounce";

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState("Awaiting Approval");
  const tabs = ["Pending", "Approved", "Declined", "Revoked"];

  const { token } = useAuthContext();
  const [query, setQuery] = useState({
    status: "Pending",
    page: 1,
    limit: 9,
    token: "",
  });

  // Debounced value for query status
  const debouncedStatus = useDebounce(activeTab, 300);

  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token: token,
      }));
    }
  }, [token]);

  useEffect(() => {
    let status = "Pending";
    switch (debouncedStatus) {
      case "Pending":
        status = "Pending";
        break;
      case "Approved":
        status = "Approved";
        break;
      case "Declined":
        status = "Declined";
        break;
      case "Revoked":
        status = "Revoked";
        break;
      default:
        status = "Pending";
    }
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: status,
    }));
  }, [debouncedStatus]);

  const {
    data: content,
    isLoading,
    isError,
  } = useExperience(
    query.token && query.status
      ? query
      : { status: "", page: 1, limit: 9, token: "" }
  );

  const data = content?.data || [];
  // const tabs = ["Reported Post", "Active", "Removed"];

  return (
    <section className="bg-white rounded-[10px] mx-12 my-8 px-12 py-8">
      <div className="flex justify-between items-end border-b">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <button className="flex items-center h-[40] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px] mb-4">
            <Image
              src="/assets/icons/Group 1000002417.png"
              alt="Filter Icon"
              width={18}
              height={12.5}
              className="w-[18px] h-[12.5px] mr-2"
            />
            <span>Filter By</span>
          </button>
        </div>
      </div>

      {/* Loading and Error Handling */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : data.length === 0 ? (
        <p>No contents found for this status</p>
      ) : (
        <ContentInfo activeTab={query.status} data={data} />
      )}


    </section>
  );
};

export default ContentPage;
