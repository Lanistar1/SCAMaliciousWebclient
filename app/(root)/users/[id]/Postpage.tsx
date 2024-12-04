"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PostSideView from "./PostSideView";
import ModalWrapper from "@/app/components/ModalWrapper";
import BlockUser from "./BlockUser";
import { useUserId, useUserPostId } from "@/app/actions/reactQuery";
import { userList, postList } from "@/app/actions/type";
import { useAuthContext } from "@/app/context/AuthContext";

// interface Props {
//   id: string;
// }

interface Post {
  title: string;
  description: string;
  date: string;
}

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  lastSeen: string;
  contentsCreated: number;
  status: "Blocked" | "Active";
  profilePicture: string;
}
const posts: Post[] = [
  {
    title: "The company is expanding its operations overseas",
    description:
      "The company has announced its expansion into multiple international markets, focusing on growth in Europe and Asia. This move is expected to increase its market share significantly and bring new opportunities for innovation.",
    date: "5.3.2020, 10:30",
  },
  {
    title: "New leadership brings a fresh vision for the future",
    description:
      "With a new CEO at the helm, the company is embracing a forward-looking strategy. The leadership team is committed to innovation, sustainability, and driving customer-centric solutions that are expected to shape the next decade of growth.",
    date: "8.12.2021, 14:15",
  },
  {
    title: "Product launch sets a new standard for the industry",
    description:
      "The latest product launch has set a high bar for competitors. Featuring cutting-edge technology and a design focused on user experience, it is already receiving positive reviews from early adopters. This product could redefine the industry standards.",
    date: "1.17.2022, 09:45",
  },
  // {
  //   title: "Company introduces a bold new sustainability initiative",
  //   description:
  //     "The company has launched an ambitious sustainability plan to reduce carbon emissions by 50% within the next five years. The initiative includes renewable energy investments, recycling programs, and innovative partnerships aimed at achieving long-term environmental goals.",
  //   date: "3.23.2023, 12:20",
  // },
  // {
  //   title: "Strategic acquisition strengthens the company's portfolio",
  //   description:
  //     "In a strategic move, the company has acquired a leading player in the AI industry. This acquisition enhances its technological capabilities and is expected to play a pivotal role in accelerating the development of next-generation products and services, offering cutting-edge solutions to clients.",
  //   date: "7.8.2024, 11:05",
  // },
];

const userProfile: UserProfile = {
  name: "Drake Regal",
  email: "dregal@gmail.com",
  joinDate: "12th Dec, 2021",
  lastSeen: "12th Dec, 2021 10:00am",
  contentsCreated: 500,
  status: "Active",
  profilePicture: "/assets/icons/scamAvatar.png", // Replace with actual path
};

interface Props {
  id: string;
}

const Page = ({ id }: Props) => {
  const { token } = useAuthContext();
  const { data: content, isLoading, isError } = useUserId(id, token);
  const { data: postContent  } = useUserPostId(id, token);
  const [userData, setUserData] = useState<userList | null>(null);
  const [postData, setPostData] = useState<postList | null>(null);

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  useEffect(() => {
    // When content is fetched successfully, update the local state
    if (content && !isLoading && !isError) {
      const { data } = content;
      setUserData(data as userList);
    }
  }, [content, isLoading, isError]);

  useEffect(() => {
    // When post is fetched successfully, update the local state
    if (postContent) {
      const { data } = postContent;
      setPostData(data as postList);

      console.log(postData);
    }
  }, [postContent]);

  const handleFilter = () => {};

  // Format dateTime to date string
  const formattedDate = new Date(userData?.createdAt || "").toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-gray-100 px-12 py-8">
      <div className="bg-white rounded-[10px] shadow-lg w-full mx-auto">
        <div className="flex">
          {/* Left Column - User Profile */}
          <div className="w-1/3 p-8 border-r">
            <div
              className={`relative flex flex-col space-y-8 ${
                userData?.isEnabled ? " text-[#9CC031]" : "text-[#FF8F6B]"
              } `}
            >
              {userData?.isEnabled ? "active" : "blocked"}
              {/* {userProfile.status === "Blocked" ? (
                <span className="absolute top-0 left-0 bg-[#FF8F6B] text-white text-xs px-2 py-1 rounded-full">
                  Blocked
                </span>
              ) : (
                <span className="absolute top-0 left-0 bg-[#9CC031] text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )} */}
              <Image
                src={userProfile.profilePicture}
                alt=""
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            </div>
            {/* <div className="flex h-[80px] text-white w-[80px] bg-[#A52A2A] rounded-full justify-center items-center font-bold mx-auto">
            {userData?.firstname?.[0] || ""}
            {userData?.lastname?.[0] || ""}
            </div> */}
            <h2 className="text-2xl font-bold text-center mt-4">
              {userData?.firstname} {userData?.lastname}
            </h2>
            <p className="text-gray-600 text-center">{userData?.email}</p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Joined: {formattedDate}
            </p>
            <p className="text-sm text-gray-500 text-center">
              Last Seen: {userProfile.lastSeen}
            </p>
            <div className="flex flex-col  items-center">
              <button
                className="w-[250px] h-[60px] bg-[#A52A2A] text-white py-2 rounded-[5px] mt-6"
                onClick={() => setIsBlockModalOpen(true)}
              >
                {userData?.isEnabled ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>

          {/* Right Column - Recent Posts */}
          <div className="w-2/3 pr-32 pl-20 py-8">
            <PostSideView Posts={posts} />
          </div>

          <ModalWrapper
            isOpen={isBlockModalOpen}
            onClose={() => setIsBlockModalOpen(false)}
          >
            <BlockUser
              onClose={() => setIsBlockModalOpen(false)}
              onSetReason={handleFilter}
              userId={id}
              status={userData?.isEnabled}
            />
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
};

export default Page;
