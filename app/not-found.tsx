/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <Image
          src="/assets/images/errorimage.png" // Replace with your logo path
          width={350}
          height={300}
          alt="Logo"
        />
        <p className="text-[#384554] text-xl font-normal">
          Sorry, we could not
        </p>
        <p className="text-[#384554] text-xl font-normal">
          find the page you are looking for!
        </p>
        <p className="text-[#A52A2A] text-base font-normal mt-5">
          They suggest you look at the Homepage
        </p>
        <Link href="/" className="pt-2">
          <div className="flex items-center justify-center pt-1">
            <Image
              src="/assets/icons/backarrow.png" // Replace with your logo path
              width={10}
              height={10}
              alt="arrow"
            />
            <p className="text-[#384554] text-sm font-normal ml-5">
              Back to Home
            </p>
          </div>
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 p-6">
        <Image
          src="/assets/images/logofaint.png" // Replace with your logo path
          width={100}
          height={100}
          alt="logo"
          className="object-contain"
        />
      </div>
    </div>
  );
}
