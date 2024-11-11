"use client";
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ExportFile, { Export } from "@/app/components/ExportFile";
import ModalWrapper from "@/app/components/ModalWrapper";
import PaginationBar from "@/app/components/PaginationBar";
import SearchBar from "@/app/components/SearchBar";
import AdminInfo from "@/app/components/AdminInfo";
import React, { useEffect, useState, useCallback } from "react";
import { useAdmin } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { saveAs } from "file-saver";

const Adminpage = () => {
  const { token } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  interface ExportItem {
    firstname: string;
    email: string;
    role: string;
    createdAt: string; // Adjust this type if `createdAt` is a Date or something else
  }

  const totalPages = 200;

  const [query, setQuery] = useState({
    status: "active",
    page: currentPage,
    limit: 3,
    token: token || "",
    dateRegisteredfrom: 0,
    dateRegisteredto: 0,
  });

  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token: token,
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

  const [filters, setFilters] = useState<Filters>({
    status: "Active",
    fromDate: "",
    toDate: "",
  });

  const [exports, setExports] = useState<Export>({
    status: "Active",
    fromDate: "",
    toDate: "",
  });

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // const handleExport = (newExports: Export) => {
  //   setExports(newExports);
  // };

  //Update `currentPage` when pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //========Handle search submission=========
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
    console.log(searchTerm);
  }, []);

  const { data: content, isLoading, isError, refetch } = useAdmin(query);

  // Refetch data whenever `query` updates
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const data = content?.data || [];

  //===========Export CSV=================
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

      {/* Loading and Error Handling */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : data.length === 0 ? (
        <p>No data found for admin</p>
      ) : (
        <AdminInfo data={data} />
      )}

      {/* <AdminInfo /> */}

      {/* filter modal */}
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

export default Adminpage;
