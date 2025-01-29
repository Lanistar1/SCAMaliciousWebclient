import React from "react";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "@/app/components/DateFormatter";

interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateRegistered: string;
  status: string;
  onViewDetails: () => void;

  // action?: () => void; // Function to handle actions (e.g., edit, delete)
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  firstName,
  lastName,
  email,
  dateRegistered,
  status,
  onViewDetails,
}) => {
  return (
    <div className=" grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] bg-white h-[55px] items-center shadow-md rounded-[10px]">
      {/* User Name */}
      <div className="font-sm text-[#09192CCC] ml-6 truncate" style={{ maxWidth: "170px" }}>
      {firstName} {lastName} 
      </div>
      {/* Email */}
      <div className="text-sm text-[#09192CCC] truncate" style={{ maxWidth: "150px" }}>{email}</div>
      {/* Date Registered */}
      <div className="text-sm text-[#09192CCC]">
        <DateFormatter date={dateRegistered} />
      </div>
      {/* Last Seen */}
      {/* <div className="text-sm text-[#09192CCC]">{role}</div> */}
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
        <Link href={`/users/${id}`}>
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

export default UserCard;
