"use client";
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ExportFile, { Export } from "@/app/components/ExportFile";
import ModalWrapper from "@/app/components/ModalWrapper";
import PaginationBar from "@/app/components/PaginationBar";
import SearchBar from "@/app/components/SearchBar";
import UserInfo from "@/app/components/UserInfo";
import React, { useEffect, useState, useCallback } from "react";
import { useMember } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";

const Userpage = () => {
  const { token } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalPages = 200;
  let page = 1;


  // Query state for data fetching
  const [query, setQuery] = useState(() => ({
    status: "active",
    page: currentPage,
    limit: 3,
    token: token || "",
    dateRegisteredfrom: 0,
    dateRegisteredto: 0,
    search: searchQuery,
  }));

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
    console.log("This is page no:", currentPage)
  }, [currentPage, searchQuery]);

  // Trigger data fetching whenever `query` changes
  const { data: content, isLoading, isError, isPlaceholderData } = useMember(query);

  // Update `currentPage` when pagination changes
  // const handlePageChange = useCallback((page: number) => {
  //   setCurrentPage(page);
  //   console.log(page);
  // }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      //page = newPage; // Assign the new page value to the declared page
      setCurrentPage(newPage); // Update the state
      console.log('Page changed to:', newPage); // Log the page
    },
    [] // No dependencies, so this will not change unless explicitly updated
  );

  // Handle search submission
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
    console.log(searchTerm);
  }, []);


  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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

  const handleFilter = (newFilters: Filters) => setFilters(newFilters);
  const handleExport = (newExports: Export) => setExports(newExports);

  const data = content?.data || [];

  return (
    <section className="flex flex-col px-12 gap-4 pt-6">
      <div className="flex justify-end ">
      <SearchBar onSearch={handleSearch} onFilter={() => setIsFilterModalOpen(true)} />
      </div>

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

      {/* Export modal */}
      <ModalWrapper
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      >
        <ExportFile
          onClose={() => setIsExportModalOpen(false)}
          onFilter={handleExport}
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
