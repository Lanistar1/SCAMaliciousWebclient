"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for current path
import { useAuthContext } from "../context/AuthContext";

const menuItems = [
  { name: "Dashboard", icon: "/assets/icons/Dashboard.png", link: "/" },
  { name: "Users", icon: "/assets/icons/user.png", link: "/users" },
  { name: "Contents", icon: "/assets/icons/contents.png", link: "/contents" },
  { name: "Reports", icon: "/assets/icons/contents.png", link: "/reports" },
  { name: "Messages", icon: "/assets/icons/messages.png", link: "/messages" },
  { name: "Settings", icon: "/assets/icons/settings.png", link: "/settings" },
  { name: "Profile", icon: "/assets/icons/profileicon.png", link: "/profile" },
];

const alertItems = [
  {
    name: "Notification",
    icon: "/assets/icons/notificaionicon.png",
    link: "/notifications",
  },
  { name: "Contact Us", icon: "/assets/icons/contact.png", link: "/contact" },
];

export default function SideNav() {
  const { logout } = useAuthContext();
  const pathname = usePathname(); // Get the current route
  
  return (
    <div className="h-screen flex flex-col justify-between bg-white shadow-none w-[13%]">
      <div className="flex flex-col pt-10">
        <Link href="/">
          <Image
            src="/assets/images/logo.png" // Replace with your logo path
            width={100}
            height={100}
            alt="Logo"
            className="mb-4 ml-16"
          />
        </Link>

        <div className="flex flex-col mt-20">
          {menuItems.map(({ name, icon, link }) => (
            <Link
              href={link}
              key={name}
              className={`flex items-center px-4 py-2 hover:bg-gray-100 
              ${pathname === link ? 'border-l-4 border-[#A52A2A] bg-gray-100' : ''}`}
              // Adds thick left border if current path matches link
            >
              <Image src={icon} alt={name} width={24} height={24} />
              <span className="ml-4 text-[#89919A] text-sm font-normal">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 mb-10">
        <h2 className="text-red-700 font-medium text-sm uppercase mt-6 mb-5">
          Alerts
        </h2>
        {alertItems.map(({ name, icon, link }) => (
          <Link
            href={link}
            key={name}
            className={`flex items-center py-2 mt-2 hover:bg-gray-100 
            ${pathname === link ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
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
          className="flex items-center py-2 mt-4 cursor-pointer hover:bg-gray-100"
        >
          <Image
            src="/assets/icons/logout.png" 
            alt="Logout"
            width={21}
            height={21}
          />
          <span className="ml-4 text-[#89919A] text-sm font-normal">Logout</span>
        </div>
      </div>
    </div>
  );
}
