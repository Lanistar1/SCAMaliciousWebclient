"use client";
import Image from "next/image";
import { useState } from "react";
import { exportToCSV, exportToExcel } from "@/app/utils/exportUtils"; // import export utilities

interface ExportModalProps {
  onClose: () => void;
  onFilter: (filters: Export) => void;
}

export interface Export {
  status: "Active" | "Blocked";
  fromDate: string;
  toDate: string;
}

const ExportFile = ({ onClose, onFilter }: ExportModalProps) => {
  const [status, setStatus] = useState<Export["status"]>("Active");
  const [fromDate, setFromDate] = useState<Export["fromDate"]>("");
  const [toDate, setToDate] = useState<Export["toDate"]>("");

  const isAllFilled = status && fromDate && toDate;

  const handleExport = () => {
    if (isAllFilled) {
      const filters = { status, fromDate, toDate };
      onFilter(filters); // Pass filters back to parent to update query
      onClose(); // Close modal

      // Trigger export based on user selection
      const filteredData = [
        // This should come from your data, for example:
        { name: "John", status: "Active", date: "2024-01-01" },
        { name: "Jane", status: "Blocked", date: "2024-01-02" },
      ];

      // Choose between CSV or Excel export
      exportToCSV(filteredData, "exported_data"); // You can call either exportToCSV or exportToExcel here
      // OR
      // exportToExcel(filteredData, "exported_data");
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 w-[340px] h-[437px] rounded-[10px] gap-4">
      <div className="flex flex-row justify-start items-center">
        <Image
          src="/assets/icons/Group 1000002417.png"
          alt="Filter Icon"
          width={18}
          height={12.5}
          className="w-[18px] h-[12.5px] mr-2"
        />
        <h2 className="font-[20px] text-[#09192CCC]">Export By</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-[#09192CCC] font-[14px]">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Export["status"])}
            className="mt-1 block w-[280px] h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div>
          <label htmlFor="from-date" className="block text-[#09192CCC] font-[14px]">
            Date Registered
          </label>
          <div className="mt-1 flex gap-[20px]">
            <input
              type="date"
              id="from-date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="block w-[130px] h-[50px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm"
            />
            <input
              type="date"
              id="to-date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="block w-[130px] h-[50px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center items-center">
        <button
          onClick={handleExport}
          className="w-[280px] h-[60px] bg-[#A52A2A]"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default ExportFile;
