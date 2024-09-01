import React from "react";
import Image from "next/image";

const Changepassword = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF] flex justify-center items-center">
        <Image
          src="/assets/images/logo.png" // Replace with your logo path
          width={300}
          height={300}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Change Password
          </h1>
          <p className="text-lg text-[#384554] mb-6">
            Kindly keep your password safe
          </p>

          <form className="mt-2">
            <div>
              <label className="block text-[#384554]">Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 mb-3 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            <div>
              <label className="block text-[#384554]">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 mb-3 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            <div>
              <label className="block text-[#384554]">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 mb-6 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            <button className="w-full p-3 bg-[#A52A2A] text-white rounded-md mt-3">
              Change Password
            </button>
          </form>
        </div>

        {/* Faint Logo at the bottom-right corner */}
        <div className="absolute bottom-8 right-8">
          <Image
            src="/assets/images/logofaint.png" // Replace with your faint logo path
            width={100}
            height={100}
            alt="Faint Logo"
            className="object-contain opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
