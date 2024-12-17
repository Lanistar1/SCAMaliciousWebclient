"use client";
import { useState, useEffect } from "react";
import {
  useFetchEnquiry,
  useFetchEnquiryReply,
  useAddReply,
} from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";

type Chat = {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function Message() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [refetchChat, setrefetchChat] = useState<string>("");

  const [formData, setFormData] = useState({
    message: "",
    name: "",
    enquiryId: "",
  });

  const { token } = useAuthContext();

  const { mutateAsync: createReply, isPending: isCreatingReply } =
    useAddReply(token);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createReply(formData);

      if (response.status !== 201) {
        return toast.error("Failed to reply cht, try again");
      }

      toast.success("Reply posted successfully.");

      // Clear the form fields on successful creation
      setFormData({
        message: "",
        enquiryId: "",
        name: "",
      });

      // refetch chat reply
      setrefetchChat("trigger");
    } catch (error) {
      console.error("Error replying chat:", error);
    }
  };

  // Fetch all chats
  const {
    data: content,
    isLoading: chatsLoading,
    isError: chatsError,
  } = useFetchEnquiry(token);

  // Fetch replies for the selected chat
  const {
    data: replyContent,
    isLoading: replyLoading,
    isError: replyError,
    refetch,
  } = useFetchEnquiryReply(token, selectedChatId || "");

  useEffect(() => {
    refetch();
  }, [refetchChat, refetch]);

  // Chats array
  const chats: Chat[] = Array.isArray(content?.data) ? content.data : [];

  // Function to handle chat selection
  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setSelectedChatId(chat._id);

    // Update formData with the selected chat's name and ID
    setFormData((prev) => ({
      ...prev,
      name: chat.name || "", // Set the name to the selected chat's name
      enquiryId: chat._id, // Set the id to the selected chat's id
    }));
  };

  return (
    <div className="flex h-full bg-gray-100">
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

        {chatsLoading && <p className="p-4 text-gray-500">Loading chats...</p>}
        {chatsError && (
          <p className="p-4 text-red-500">Failed to load chats.</p>
        )}

        <ul>
          {chats.map((chat) => (
            <li
              key={chat._id}
              className={`flex flex-col p-4 cursor-pointer ${
                selectedChat?._id === chat._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="flex items-center">
                <Image
                  src="/assets/images/logo.png"
                  alt={chat.name || "User"}
                  className="w-10 h-10 rounded-full"
                  width={50}
                  height={50}
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-[14px] font-medium">
                    {chat.name || "Unknown User"}
                  </h2>
                  <p className="text-sm text-gray-600 truncate break-words ...">
                    {chat.message || "No message available"}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400 ml-12 pl-2 mt-1 text-start">
                {new Date(chat.createdAt).toLocaleTimeString() || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white shadow-sm rounded-[5px] ml-2 overflow-y-auto">
        {selectedChat ? (
          <div className="p-6 h-full flex flex-col justify-between">
            {/* Chat Header */}
            <h2 className="text-[16px] font-medium text-gray-800">
              Conversation with {selectedChat.name}
            </h2>

            {/* Chat and Reply Messages */}
            <div className="mt-4 flex flex-col space-y-4">
              {/* Selected Chat */}
              <div className="flex items-start">
                <Image
                  src="/assets/images/logo.png"
                  alt={selectedChat.name}
                  className="w-8 h-8 rounded-full"
                  width={50}
                  height={50}
                />
                <div className="ml-2 p-3 bg-gray-200 rounded-lg">
                  <p className="text-gray-700">{selectedChat.message}</p>
                </div>
              </div>

              {/* Replies */}
              {replyLoading && (
                <p className="text-gray-500">Loading replies...</p>
              )}
              {replyError && (
                <p className="text-red-500">Failed to load replies.</p>
              )}
              {replyContent?.data?.map((reply: any, index: number) => (
                <div key={index} className="flex items-start justify-end">
                  <div className="p-3 bg-blue-500 text-white rounded-lg">
                    <p>{reply.message}</p>
                  </div>
                  <Image
                    src="/assets/images/logo.png"
                    alt="You"
                    className="ml-2 w-8 h-8 rounded-full"
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full px-4 py-2 mt-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a reply..."
                value={formData.message}
                name="message"
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-[#A52A2A] text-white rounded-[5px] hover:bg-red-600"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to view the conversation
          </div>
        )}
      </div>
    </div>
  );
}
