import React from "react";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
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
        <Image
          src="/assets/images/logo.png"
          alt="SCAMalicious Logo"
          width={80}
          height={80}
        />
        <h2 className="text-2xl font-normal text-[#A52A2A] mt-4">
          Welcome Admin!
        </h2>

        <form className="mt-8 w-1/2 space-y-4">
          <div>
            <label className="block text-[#384554]">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 rounded-md focus:outline-none focus:border-gray-400"
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
                className="w-full p-3 mb-1 rounded-md focus:outline-none focus:border-gray-400"
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

          <Link href="/">
            <div className="flex justify-end items-center mb-3 mt-1">
              <p className="text-sm font-medium text-[#384554]">
                Forgot Password?
              </p>
            </div>
          </Link>

          <button className="w-full py-3 bg-[#A52A2A] text-white text-base rounded-md">
            Sign In
          </button>
          <div className="flex justify-center items-center mb-3 mt-2">
            <p className="text-sm font-normal text-[#384554]">
              Don't have an account?
            </p>
            <Link href="/sign-up">
              <p className="text-sm font-medium text-[#A52A2A] ml-1">Sign Up</p>
            </Link>
          </div>
        </form>

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

export default Signin;
