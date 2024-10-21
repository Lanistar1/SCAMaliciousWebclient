"use client";
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ExportFile, { Export } from "@/app/components/ExportFile";
import ModalWrapper from "@/app/components/ModalWrapper";
import PaginationBar from "@/app/components/PaginationBar";
import SearchBar from "@/app/components/SearchBar";
import UserInfo from "@/app/components/UserInfo";
import React, { useEffect, useState } from "react";
import { useMember } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";

const Userpage = () => {
  const { token } = useAuthContext();

  const [query, setQuery] = useState({
    status: "active",
    page: 1,
    limit: 6,
    token: "",
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

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleExport = (newExports: Export) => {
    setExports(newExports);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 200;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: content,
    isLoading,
    isError,
  } = useMember(
    query.token && query.status
      ? query
      : {
          status: "active",
          page: 1,
          limit: 6,
          token: "",
        }
  );

  const data = content?.data || [];

  return (
    <section className="flex flex-col px-12 gap-4 pt-6">
      <div className="flex justify-end ">
        <SearchBar onFilter={() => setIsFilterModalOpen(true)} />
      </div>

      {/* Loading and Error Handling */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : data.length === 0 ? (
        <p>No data found for user</p>
      ) : (
        <UserInfo data={data} />
      )}


      {/* <UserInfo /> */}

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

      {/* export modal */}
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
