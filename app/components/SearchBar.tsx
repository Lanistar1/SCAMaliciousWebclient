"use client"

import React from 'react';

interface ShowFilter {
  onFilter: () => void;
}

const SearchBar = ({onFilter}:ShowFilter) => {

  const filter = () =>{
    onFilter()
  }
  return (
    <div className="flex items-center space-x-4">
      <div className="flex border border-[#A52A2A33] rounded-r-[5px] overflow-hidden">
        <input
          type="text"
          placeholder="Name, Email and Status"
          className="p-2 w-[436px] h-[50px] border-none outline-none"
        />
        <button className=" bg-[#A52A2A] w-[110px] font-[Montserrat] h-[50px] text-white px-4 py-2">Search</button>
      </div>


      <button className="flex items-center h-[50px] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px]" onClick={filter}>
        <img src="/assets/icons/Group 1000002417.png" alt="Filter Icon" className="w-[18px] h-[12.5px] mr-2" />
        <span>Filter By</span>
      </button>
    </div>
  );
};

export default SearchBar;
