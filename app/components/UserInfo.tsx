'use client';

import React, { useState, useEffect } from 'react';
import UserCard from './UserCard'; // Adjust path if necessary


const users = [
    {
      "id": 1,
      "name": "Jim Craig",
      "email": "JimCraig@gmail.com",
      "dateRegistered": "August 26, 2024",
      "lastSeen": "August 26, 2024 20:08",
      "status": "Blocked"
    },
    {
      "id": 2,
      "name": "Sarah Lee",
      "email": "SarahLee@yahoo.com",
      "dateRegistered": "July 18, 2024",
      "lastSeen": "August 24, 2024 14:23",
      "status": "Active"
    },
    {
      "id": 3,
      "name": "David Smith",
      "email": "DavidSmith@outlook.com",
      "dateRegistered": "June 12, 2024",
      "lastSeen": "August 26, 2024 18:45",
      "status": "Active"
    },
    {
      "id": 4,
      "name": "Amanda Johnson",
      "email": "AmandaJ@company.com",
      "dateRegistered": "May 2, 2024",
      "lastSeen": "August 23, 2024 09:15",
      "status": "Blocked"
    },
    {
      "id": 5,
      "name": "Michael Brown",
      "email": "MichaelB@domain.com",
      "dateRegistered": "April 22, 2024",
      "lastSeen": "August 25, 2024 12:30",
      "status": "Active"
    }
  ]

const UserCardGrid = () => {

  
  
  return (
    <div className=" space-y-4 w-full" >
      {/* Headings Row - Keep 6 columns on all screens */}
      <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] bg-white h-[70px] items-center rounded-[10px]">
        <div className='flex-1 text-left ml-6'>Name</div>
        <div className='flex-1 text-left '>Email</div>
        <div className='flex-1  text-left'>Date Registered</div>
        <div className='flex-1  text-left'>Last Seen</div>
        <div className='flex-1  text-left'>Status</div>
        <div className='flex-1  text-left w-10'>Action</div>
      </div>

      {/* Render user cards */}
      <div className="flex flex-col gap-6">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UserCardGrid;