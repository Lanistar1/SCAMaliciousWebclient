"use client";
import React, { useState } from "react";
import Image from "next/image";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
  onExport: (data: any[]) => void; // Accept data to be exported as a prop
}

const SearchBar = ({ onSearch, onFilter, onExport }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Trigger search when the button is clicked
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex border border-[#A52A2A33] rounded-r-[5px] overflow-hidden">
        <input
          type="text"
          placeholder="Name, Email and Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-[436px] h-[50px] border-none outline-none"
        />
        <button
          className="bg-[#A52A2A] w-[110px] font-[Montserrat] h-[50px] text-white px-4 py-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <button
        className="flex items-center h-[50px] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px]"
        onClick={onFilter}
      >
        <Image
          src="/assets/icons/Group 1000002417.png"
          alt="Filter Icon"
          height={12.5}
          width={18}
          className="w-[18px] h-[12.5px] mr-2"
        />
        <span>Filter By</span>
      </button>

      <button
        className="flex items-center h-[50px] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px]"
        onClick={() => onExport([])} // Trigger the export with the page data
      >
        <Image
          src="/assets/icons/exportIcon.png"
          alt="Export Icon"
          height={20}
          width={16}
          className="mr-2"
        />
        <span>Export</span>
      </button>
    </div>
  );
};

export default SearchBar;
