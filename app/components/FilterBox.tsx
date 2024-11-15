"use client"
import Image from "next/image";
import { useState } from "react";


interface FilterModalProps {
  onClose: () => void;
  onFilter: (filters: Filters) => void;
}

export interface Filters {
  status: "active" | "blocked";
  fromDate: string;
  toDate: string;
}

const FilterModal = ({ onClose, onFilter }: FilterModalProps) => {
  const [status, setStatus] = useState<Filters["status"]>("active");
  const [fromDate, setFromDate] = useState<Filters["fromDate"]>("");
  const [toDate, setToDate] = useState<Filters["toDate"]>("");


  const isAllFilled = status&& fromDate && toDate

  const handleFilter = () => {
    if(isAllFilled){

      onFilter({ status, fromDate, toDate });
      onClose();
    }
   
  };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 w-[340px] h-[437px] rounded-[10px] gap-4">
      
      <div className="flex flex-row justify-start items-center"> 
        <Image src="/assets/icons/Group 1000002417.png" alt="Filter Icon" width={18} height={12.5} className="w-[18px] h-[12.5px] mr-2" />
        <h2 className="font-[20px] text-[#09192CCC]  ">Filter By</h2>
      </div>
     
      <div className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-[#09192CCC] font-[14px]">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Filters["status"])}
            className="mt-1 block w-[280px] h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm  sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div>
          <label htmlFor="from-date" className="block text-[#09192CCC]  font-[14px]">
            Date Registered
          </label>
          <div className="mt-1 flex gap-[20px]">
            <input
              type="date"
              id="from-date"
              placeholder="from-date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="block  w-[130px] h-[50px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm"
            />
          
            <input
              type="date"
              id="to-date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="block  w-[130px] h-[50px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center  items-center ">
        {/* <Button variant="outline" onClick={onClose}>
          Cancel
        </Button> */}
        <button onClick={handleFilter} className={`w-[280px] h-[60px] ${isAllFilled? "bg-[#A52A2A]":"bg-[#09192C33]"} rounded-[5px]`}>Filter</button>
      </div>
    </div>
  );
}

export default  FilterModal