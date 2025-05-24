"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", icon: "/assets/icons/Dashboard.png", link: "/" },
  { name: "Users", icon: "/assets/icons/users.png", link: "/users" },
  { name: "Contents", icon: "/assets/icons/content.png", link: "/contents" },
  { name: "Reports", icon: "/assets/icons/report.png", link: "/reports" },
  { name: "Inquiry", icon: "/assets/icons/inquiry.png", link: "/messages" },
  { name: "Admins", icon: "/assets/icons/admin.png", link: "/admins" },
  { name: "Videos", icon: "/assets/icons/profile.png", link: "/videos" },
  { name: "Profile", icon: "/assets/icons/profile.png", link: "/profile" },
];

const alertItems = [
  { name: "Settings", icon: "/assets/icons/settings.png", link: "/settings" },
];

export default function SideNav() {
  const { logout } = useAuthContext();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close the sidebar when a menu link is clicked
  const handleLinkClick = () => setIsSidebarOpen(false);

  return (
    <div className="relative md:flex md:w-[19%] h-screen">
      {/* Hamburger Icon for Small Screens */}
      <button
        className="absolute top-4 left-4 z-20 p-2 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-800" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Sidebar for Large Screens */}
      <div className="hidden md:flex flex-col justify-between bg-white shadow-none w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto mt-4"
          />
        </Link>

        {/* Menu Items */}
        <div className="flex flex-col mt-10 px-4">
          {menuItems.map(({ name, icon, link }) => (
            <Link
              href={link}
              key={name}
              className={`flex items-center px-4 mr-4 py-2 hover:bg-gray-100 ${
                pathname === link
                  ? "border-l-4 border-[#A52A2A] bg-gray-100"
                  : ""
              }`}
            >
              <Image src={icon} alt={name} width={24} height={24} />
              <span className="ml-4 text-[#89919A] text-[14px] font-normal">
                {name}
              </span>
            </Link>
          ))}
        </div>

        {/* Alerts and Logout */}
        <div className="pr-4 px-4 mb-10 mt-2">
          {alertItems.map(({ name, icon, link }) => (
            <Link
              href={link}
              key={name}
              className={`flex items-center py-2 mt-2 hover:bg-gray-100 ${
                pathname === link
                  ? "border-l-4 border-[#A52A2A] bg-gray-100"
                  : ""
              }`}
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

      {/* Sidebar Popup for Small Screens */}
      {isSidebarOpen && (
        <div className="fixed top-4 left-4 w-[75%] max-w-xs h-auto bg-white shadow-lg z-10 p-4 space-y-2 rounded-md md:hidden">
          {/* Menu Items */}
          <div className="flex flex-col">
            {menuItems.map(({ name, icon, link }) => (
              <Link
                href={link}
                key={name}
                onClick={handleLinkClick}
                className={`flex items-center p-2 hover:bg-gray-100 ${
                  pathname === link
                    ? "border-l-4 border-[#A52A2A] bg-gray-100"
                    : ""
                }`}
              >
                <Image src={icon} alt={name} width={20} height={20} />
                <span className="ml-3 text-[#89919A] text-sm font-normal">
                  {name}
                </span>
              </Link>
            ))}
          </div>

          {/* Alerts and Logout */}
          <div className="mt-4 space-y-2">
            {alertItems.map(({ name, icon, link }) => (
              <Link
                href={link}
                key={name}
                onClick={handleLinkClick}
                className={`flex items-center p-2 hover:bg-gray-100 ${
                  pathname === link
                    ? "border-l-4 border-[#A52A2A] bg-gray-100"
                    : ""
                }`}
              >
                <Image src={icon} alt={name} width={20} height={20} />
                <span className="ml-3 text-[#89919A] text-sm font-normal">
                  {name}
                </span>
              </Link>
            ))}
            <div
              onClick={() => {
                logout();
                handleLinkClick();
              }}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <Image
                src="/assets/icons/logout.png"
                alt="Logout"
                width={20}
                height={20}
              />
              <span className="ml-3 text-[#89919A] text-sm font-normal">
                Logout
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-0 md:hidden"
          onClick={handleLinkClick}
        />
      )}
    </div>
  );
}
