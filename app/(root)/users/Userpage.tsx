"use client";
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ModalWrapper from "@/app/components/ModalWrapper";
import PaginationBar from "@/app/components/PaginationBar";
import SearchBar from "@/app/components/SearchBar";
import UserInfo from "@/app/components/UserInfo";
import React, { useEffect, useState, useCallback } from "react";
import { useMember } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { saveAs } from "file-saver";

const Userpage = () => {
  const { token } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

  // const totalPages = 200;

  interface ExportItem {
    firstname: string;
    email: string;
    role: string;
    createdAt: string; // Adjust this type if `createdAt` is a Date or something else
  }

  // Query state for data fetching
  // const [query, setQuery] = useState(() => ({
  //   status: "active",
  //   page: currentPage,
  //   limit: 6,
  //   token: token || "",
  //   dateRegisteredfrom: "",
  //   dateRegisteredto: "",
  //   search: searchQuery,
  // }));

  const initialQuery = {
    status: "",
    page: 1,
    limit: 5,
    token: token || "",
    dateRegisteredfrom: "",
    dateRegisteredto: "",
    search: "",
  };

  // Query state for data fetching
  const [query, setQuery] = useState(initialQuery);

  //==============Trigger data fetching whenever `query` changes ==============
  const {
    data: content,
    isLoading,
    isError,
    isPlaceholderData,
    refetch,
  } = useMember(query);

  //========== Update token in query if it changes ===========
  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token,
      }));
    }
  }, [token]);

  //========== Update `query` when `currentPage` changes, ensuring a new reference ===========
  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page: currentPage,
      search: searchQuery,
    }));
    console.log("This is page no:", currentPage);
  }, [currentPage, searchQuery]);

  //========== Refetch data whenever `query` updates ===============
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  //===========Update `currentPage` when pagination changes ================
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    console.log(page);
  }, []);

  //========= Handle search submission ==================
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
    console.log(searchTerm);
  }, []);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ===========Handle filter =====================
  const handleFilter = (filters: Filters) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: filters.status,
      // Extract only the date portion (YYYY-MM-DD) or set to an empty string if not provided
      dateRegisteredfrom: filters.fromDate
        ? new Date(filters.fromDate).toISOString().slice(0, 10)
        : "",
      dateRegisteredto: filters.toDate
        ? new Date(filters.toDate).toISOString().slice(0, 10)
        : "",
    }));

    setAppliedFilters(filters);
    setIsFilterModalOpen(false);
  };

  const data = content?.data || [];
  const count = content?.totalCount;

  // const totalPages = count/5;

  const totalPages = Math.ceil(count / 5);



  // Reset filter and query
  const handleReset = () => {
    setQuery(initialQuery);
    setAppliedFilters(null);
    setCurrentPage(1);
  };

  // ============ export files as CSV =====================
  const handleExport = useCallback(() => {
    // Assuming `content.data` is the array of data to be exported
    const dataToExport: ExportItem[] = content?.data || [];

    // Convert data to CSV format
    const csvHeaders = ["Name", "Email", "Role", "Date Created"]; // Adjust as per the data fields you want
    const csvRows = dataToExport.map((item) => [
      item.firstname,
      item.email,
      item.role,
      item.createdAt, // Replace these with the actual keys in your data
    ]);

    // Add header row
    const csvContent = [csvHeaders, ...csvRows]
      .map((row) => row.join(","))
      .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Use FileSaver.js to trigger download
    saveAs(blob, "export.csv");
  }, [content]);

  return (
    <section className="flex flex-col px-12 gap-4 pt-6">
      <div className="flex justify-end ">
        <SearchBar
          onSearch={handleSearch}
          onFilter={() => setIsFilterModalOpen(true)}
          onExport={handleExport}
        />
      </div>

      {/* Applied Filters Display */}
      {appliedFilters && (
        <div className="flex justify-between items-center my-4 p-2 bg-gray-200 rounded">
          <p>
            <strong>Applied Filters:</strong>
            Status: {appliedFilters.status || "Any"}, Date From:{" "}
            {appliedFilters.fromDate || "Any"}, Date To:{" "}
            {appliedFilters.toDate || "Any"}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}

      {/* Loading and Error Handling */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : data.length === 0 ? (
        <p>No data found for user</p>
      ) : (
        <div>
          {isPlaceholderData && <p>Loading new page...</p>}
          <UserInfo data={data} />
        </div>
      )}

      {/* Filter modal */}
      <ModalWrapper
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      </ModalWrapper>

      {/* Page Pagination */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Userpage;
