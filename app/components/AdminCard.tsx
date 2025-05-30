"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./DateFormatter";

interface AdminCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateRegistered: string;
  role: string;
  status: string;
  onViewDetails: () => void; // Function to handle actions (e.g., edit, delete)
}

const AdminCard: React.FC<AdminCardProps> = ({
  id,
  firstName,
  lastName,
  email,
  dateRegistered,
  role,
  status,
  onViewDetails,
}) => {
  return (
    <div className=" grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr_1fr] bg-white h-[55px] items-center shadow-md rounded-[10px]">
      {/* First Name */}
      <div className="font-sm text-[#09192CCC] ml-6">{firstName} </div>
      {/* Last Name */}
      <div className="font-sm text-[#09192CCC]">{lastName} </div>
      {/* Email */}
      <div className="text-sm text-[#09192CCC]">
        {email.length > 15 ? `${email.slice(0, 15)}...` : email}
      </div>
      {/* Date Registered */}
      <div className="text-sm text-[#09192CCC]">
        <DateFormatter date={dateRegistered} />
      </div>
      {/* Last Seen */}
      <div className="text-sm text-[#09192CCC]">{role}</div>
      {/* Status */}
      <div
        className={`inline-block items-center pt-1 text-center text-[14px]  rounded-[33px] w-[95px] h-[28px]  ${
          status === "active" ? "text-[#9CC031]" : "text-[#FF8F6B]"
        } ${status === "active" ? "bg-[#f9ffe6]" : "bg-[#f8e9e4]"}`}
      >
        {status}
      </div>
      {/* Action buttons */}
      <div className="text-gray-500">
        <Link href={`/admins/${id}`}>
          <Image
            src={"/assets/icons/icon-more-horizontal.png"}
            alt="icon-more"
            width={25}
            height={25}
            className="w-[25px] h-[25px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminCard;
