"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for current path
import { useAuthContext } from "../context/AuthContext";

const menuItems = [
  { name: "Dashboard", icon: "/assets/icons/Dashboard.png", link: "/" },
  { name: "Users", icon: "/assets/icons/users.png", link: "/users" },
  { name: "Contents", icon: "/assets/icons/content.png", link: "/contents" },
  { name: "Reports", icon: "/assets/icons/report.png", link: "/reports" },
  { name: "Inquiry", icon: "/assets/icons/inquiry.png", link: "/messages" },
  { name: "Admins", icon: "/assets/icons/admin.png", link: "/admins" },
  { name: "Profile", icon: "/assets/icons/profile.png", link: "/profile" },
];

const alertItems = [
  { name: "Settings", icon: "/assets/icons/settings.png", link: "/settings" },
  // { name: "Contact Us", icon: "/assets/icons/contact.png", link: "/contact" },
];

export default function SideNav() {
  const { logout } = useAuthContext();
  const pathname = usePathname(); // Get the current route

  return (
    <div className="h-screen flex flex-col justify-between bg-white shadow-none w-[13%]">
      <div className="flex flex-col pt-4">
        <Link href="/">
          <Image
            src="/assets/images/logo.png" // Replace with your logo path
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto"
          />
        </Link>

        <div className="flex flex-col mt-10">
          {menuItems.map(({ name, icon, link }) => (
            <Link
              href={link}
              key={name}
              className={`flex items-center px-4 py-2 hover:bg-gray-100 
              ${
                pathname === link
                  ? "border-l-4 border-[#A52A2A] bg-gray-100"
                  : ""
              }`}
              // Adds thick left border if current path matches link
            >
              <Image src={icon} alt={name} width={24} height={24} />
              <span className="ml-4 text-[#89919A] text-[14px] space-y-4 font-normal">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="pr-4 px-4 mb-10 mt-2">
        {alertItems.map(({ name, icon, link }) => (
          <Link
            href={link}
            key={name}
            className={`flex items-center py-2 mt-2 hover:bg-gray-100 
            ${
              pathname === link ? "border-l-4 border-[#A52A2A] bg-gray-100" : ""
            }`}
            // Adds thick left border if current path matches link
          >
            <Image src={icon} alt={name} width={24} height={24} />
            <span className="ml-4 text-[#89919A] text-sm font-normal">
              {name}
            </span>
          </Link>
        ))}

        <div
          onClick={logout}
          className="flex items-center px-1 py-2 mt-2 cursor-pointer hover:bg-gray-100"
        >
          <Image
            src="/assets/icons/logout.png"
            alt="Logout"
            width={21}
            height={21}
          />
          <span className="ml-4 text-[#89919A] text-sm font-normal">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
