import React from 'react';
import Link from "next/link";
import Image from 'next/image';

interface UserCardProps {
    id: number;
    name: string;
    email: string;
    dateRegistered: string;
    lastSeen: string;
    status: string;
    action?: () => void; // Function to handle actions (e.g., edit, delete)
  }

const UserCard = ({ ...user } : UserCardProps) => {
  return (
    <div className=" grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] bg-white h-[70px] items-center shadow-md rounded-[10px]">
      {/* User Name */}
      <div className="font-sm text-[#09192CCC] ml-6">{user.name}</div>
      {/* Email */}
      <div className="text-sm text-[#09192CCC]">{user.email}</div>
      {/* Date Registered */}
      <div className="text-sm text-[#09192CCC]">{user.dateRegistered}</div>
      {/* Last Seen */}
      <div className="text-sm text-[#09192CCC]">{user.lastSeen}</div>
      {/* Status */}
      <div
        className={`inline-block items-center text-center  rounded-[33px] w-[95px] h-[28px] text-white ${
          user.status === 'Active' ? 'bg-[#9CC031]' : 'bg-[#FF8F6B]'
        }`}
      >
        {user.status}
      </div>
      {/* Action buttons */}
      <div className="text-gray-500">
          <Link href={`/users/${user.id}`}>
          <Image src={"/assets/icons/icon-more-horizontal.png"} alt="icon-more" width={25} height={25} className='w-[25px] h-[25px]'/>
          </Link>
      </div>
    </div>
  );
};

export default UserCard;
