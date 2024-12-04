'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useUser } from '@/app/actions/reactQuery';
import { useAuthContext } from '@/app/context/AuthContext';
import Link from "next/link";

export default function ProfilePage() {
  const { token } = useAuthContext();
  const [query, setQuery] = useState({
    status: 'Pending',
    token: '',
  });
  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token: token,
      }));
    }
  }, [token]);

  const { data: user, isLoading, isError } = useUser(token);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data.</div>;

  // Format dateTime to date string
  const formattedDate = new Date(user?.createdAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex justify-start md:justify-center md:mx-auto items-center md:items-center min-h-screen bg-gray-100 px-10 md:pl-36">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-none p-8 md:p-24 flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center border-b md:border-r md:border-b-0 border-gray-300 pb-8 md:pb-0 md:pr-8">
          {/* Active Status */}
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            Active
          </span>

          {/* Profile Image */}
          <div className="relative mb-6">
            <div className="mx-auto ml-6 overflow-hidden">
              <Image
                src="/assets/icons/scamAvatar.png"
                alt="SCAMalicious Logo"
                width={150}
                height={150}
              />
            </div>
          </div>

          {/* Change Image */}
          <div className="mt-4 ml-4">
            <button className="text-red-600 font-medium text-base flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 000 4h12a2 2 0 000-4H4zM4 9a2 2 0 000 4h8a2 2 0 000-4H4z"
                  clipRule="evenodd"
                />
              </svg>
              Change Image
            </button>
          </div>

          {/* User Name and Joined Date */}
          <h2 className="text-2xl font-semibold mt-6">{user?.firstname} {user?.lastname}</h2>
          <h2 className="text-md font-medium my-1 md:hidden">{user?.email}</h2>
          <p className="text-sm text-gray-500">Joined: {formattedDate}</p>

          {/* Change Password */}
          <div className="mt-6">
            <button className="text-red-600 font-medium text-base flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 000 4h12a2 2 0 000-4H4zM4 9a2 2 0 000 4h8a2 2 0 000-4H4z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="/change-password">
                <p className="text-sm font-medium text-[#A52A2A] ml-1">Change Password</p>
              </Link>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col w-full md:w-2/3 pl-0 md:pl-12 mt-8 md:mt-0">
          {/* First Name */}
          <div className="mb-6">
            <label className="block text-[12px] font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={user?.firstname}
              disabled
              className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-md"
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label className="block text-[12px] font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={user?.lastname}
              disabled
              className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-md"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-[12px] font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
