"use client ";
import React, { useState, useEffect, useCallback } from "react";
import ContentInfo from "./ContentInfo";
import Image from "next/image";
import { useExperience } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import useDebounce from "@/app/actions/debounce";
import PaginationBar from "@/app/components/PaginationBar";

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const tabs = ["Pending", "Approved", "Declined", "Revoked"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  //const totalPages = 200;

  const { token } = useAuthContext();

  const [query, setQuery] = useState({
    status: "Pending",
    page: currentPage,
    limit: 6,
    token: token || "",
  });

  // Update token in query if it changes
  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token,
      }));
    }
  }, [token]);

  // Update `query` when `currentPage` changes, ensuring a new reference
  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page: currentPage,
      search: searchQuery,
    }));
    console.log("This is page no:", currentPage);
  }, [currentPage, searchQuery]);

  // Debounced value for query status
  const debouncedStatus = useDebounce(activeTab, 300);

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

  //=======Trigger data fetching whenever `query` changes===========
  const { data: content, isLoading, isError } = useExperience(query);

  //===========Update `currentPage` when pagination changes==========
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    console.log(page);
  }, []);

  const data = content?.data || [];

  //=========total page count =========
  const count = content?.totalCount;
  const totalPages = Math.round(count / 6);

  return (
    <section className="bg-white rounded-[10px] mx-12 my-8 px-6 md:px-12 py-8">
      <div className="flex justify-between items-end border-b">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600 text-[10px] md:text-[14px] md:font-medium"
                  : "text-gray-500 font-medium text-[10px] md:text-[14px]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* <div>
          <button className="hidden md:flex items-center h-[40] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px] mb-4">
            <Image
              src="/assets/icons/Group 1000002417.png"
              alt="Filter Icon"
              width={18}
              height={12.5}
              className="w-[18px] h-[12.5px] mr-2"
            />
            <span>Filter By</span>
          </button>
        </div> */}
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

      {/* Page Pagination */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ContentPage;
