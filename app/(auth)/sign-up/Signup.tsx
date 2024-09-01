import React from "react";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF] flex justify-center items-center">
        <div className="text-center">
          <Image
            src="/assets/images/logo.png"
            alt="SCAMalicious Logo"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Admin Registration
          </h1>
          <p className="text-lg text-[#384554] mb-6">Create new admin user</p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="block text-[#384554]">First Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="john"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Last Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="doe"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Username</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="johnny"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <Image
                    src="/assets/icons/email.png"
                    alt="lockicon"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <Image
                    src="/assets/icons/lock.png"
                    alt="lockicon"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
            <button className="w-full py-3 bg-[#A52A2A] text-white text-base rounded-md">
              Create Account
            </button>

            <div className="flex justify-center items-center mb-3 mt-2">
              <p className="text-sm font-normal text-[#384554]">
                Already have an account?
              </p>
              <Link href="/sign-in">
                <p className="text-sm font-medium text-[#A52A2A] ml-1">
                  Sign In
                </p>
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Right Image */}
        <div className="absolute bottom-4 right-4">
          <Image
            src="/assets/images/logofaint.png"
            alt="SCAMalicious Logo"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
