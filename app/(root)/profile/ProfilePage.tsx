'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useUser } from '@/app/actions/reactQuery';
import { useAuthContext } from '@/app/context/AuthContext';


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

  // format dateTime to date string
  const formattedDate = new Date(user?.createdAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pl-64">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-none p-24 flex w-full max-w-4xl">
        {/* Left Section */}
        <div className="w-1/2 text-center border-r border-gray-300 pr-8">
          {/* Active Status */}
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            Active
          </span>

          {/* Profile Image */}
          <div className="relative mb-6">
            <div className=" mx-auto  overflow-hidden">
              <Image
                src="/assets/images/profile2.png"
                alt="SCAMalicious Logo"
                width={150}
                height={150}
              />
            </div>
          </div>

          {/* Change Image */}
          <div className="mt-4">
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
              Change Password
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 pl-12">
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
