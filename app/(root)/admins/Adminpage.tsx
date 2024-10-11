"use client";
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ExportFile, { Export } from "@/app/components/ExportFile";
import ModalWrapper from "@/app/components/ModalWrapper";
import PaginationBar from "@/app/components/PaginationBar";
import SearchBar from "@/app/components/SearchBar";
import UserInfo from "@/app/components/UserInfo";
import AdminCardGrid from "@/app/components/AdminInfo";
import AdminInfo from "@/app/components/AdminInfo"
import React, { useState } from "react";

const Adminpage = () => {
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

  return (
    <section className="flex flex-col px-12 gap-4 pt-6">
      <div className="flex justify-end ">
        <SearchBar onFilter={() => setIsFilterModalOpen(true)} />
      </div>

      {/* <UserInfo /> */}

      <AdminInfo />

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

export default Adminpage;

