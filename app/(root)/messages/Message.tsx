"use client";
import { useState } from "react";

type Chat = {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  detailMessage: string;
};

export default function Message() {
  // Define the chats data
  const chats: Chat[] = [
    {
      id: 1,
      name: "Jennifer Markus",
      message: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      time: "05:30 PM",
      avatar: "/assets/images/logo.png",
      detailMessage:
        "Hi Jennifer, I did finish the Hi-Fi wireframes for the flora app design. Let me know if you need anything else.",
    },
    {
      id: 2,
      name: "Iya Ratson",
      message: "Can you update the dashboard?",
      time: "04:15 PM",
      avatar: "/assets/images/logo.png",
      detailMessage:
        "Hi Iya, I’ve updated the dashboard with the requested changes. Let me know if it looks good.",
    },
    {
      id: 3,
      name: "David Elson",
      message: "Let’s sync up tomorrow.",
      time: "02:45 PM",
      avatar: "/assets/images/logo.png",
      detailMessage:
        "Hi David, sure! Let’s sync up tomorrow at 10 AM. I’ll share the meeting invite.",
    },
    {
      id: 4,
      name: "Mary Freund",
      message: "Thanks for the report!",
      time: "01:20 PM",
      avatar: "/assets/images/logo.png",
      detailMessage:
        "Hi Mary, you’re welcome! Let me know if you need any further assistance.",
    },
  ];

  // State to track the selected chat
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="flex bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white shadow-sm overflow-y-auto rounded-[5px]">
        <div className="p-4 border-b">
          <h1 className="text-lg font-normal">All Messages</h1>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="mt-2 w-full px-4 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`flex flex-col p-4 cursor-pointer ${
                selectedChat?.id === chat.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-[14px] font-medium">{chat.name}</h2>
                  <p className="text-sm text-gray-600 truncate break-words ...">
                    {chat.message}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400 ml-12 pl-2 mt-1 text-start">
                {chat.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="ml-1 w-full bg-white shadow-sm rounded-[5px]">
        {selectedChat ? (
          <div className="p-6">
            <h2 className="text-[16px] font-medium text-gray-800">
              Conversation with {selectedChat.name}
            </h2>
            <h3 className="mt-4 text-[14px] font-medium">
              Message Summary: {selectedChat.message}
            </h3>
            <p className="mt-4 text-gray-600 text-[14px]">
              {selectedChat.detailMessage}
            </p>
            <div className="mt-8 flex items-center">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <h4 className="font-medium">{selectedChat.name}</h4>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-[14px] font-medium">Your Reply</h4>
              <textarea
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a message"
              />
              <button className="mt-4 px-10 py-2 items-end bg-[#A52A2A] text-white rounded-[5px] hover:bg-red-600">
                Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to view the details
          </div>
        )}
      </div>
    </div>
  );
}
