import React from "react";
import Image from "next/image";
import Link from "next/link";

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
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <Image src={icon} alt={name} width={24} height={24} />
              <span className="ml-4 text-[#89919A] text-sm font-normal">{name}</span>
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
            className="flex items-center py-2 mt-2 hover:bg-gray-100"
          >
            <Image src={icon} alt={name} width={24} height={24} />
            <span className="ml-4 text-[#89919A] text-sm font-normal">{name}</span>
          </Link>
        ))}
      </div>

      {/* <div className="flex items-center justify-center mb-10">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/icons/notificaionicon.png" // Replace with your icon path
            width={24}
            height={24}
            alt="Notification"
          />
          <span className="text-gray-700">9</span>
        </div>
      </div> */}
    </div>
  );
}
