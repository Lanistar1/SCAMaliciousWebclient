"use client"
import FilterModal, { Filters } from "@/app/components/FilterBox";
import ModalWrapper from "@/app/components/ModalWrapper";
import SearchBar from "@/app/components/SearchBar";
import UserInfo from "@/app/components/UserInfo";
import React, { useState } from "react";

const Userpage = () => {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: "Active",
    fromDate: "",
    toDate: "",
  });

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };


  return (

    <section className="flex flex-col px-12 gap-4 pt-6">
      <div className="flex justify-end ">
      <SearchBar onFilter={()=> setIsFilterModalOpen(true)}/>
      </div>

      <UserInfo/>

      <ModalWrapper isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      </ModalWrapper>
  
    </section>
  )
};

export default Userpage;
