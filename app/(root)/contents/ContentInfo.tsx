"use client";
import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

interface Post {
  _id: string;
  email: string;
  message: string;
  title: string;
  firstname: string;
  lastname: string;
  userId: string;
  experienceId: string;
  userDetails: UserDetails;
  adminId: string;
  reasonDecline: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  keywordCount: number;
  reportCount: number;
}

interface UserDetails {
  _id: string;
  username: string;
  firstname: string;
  lastname: string
}


interface ContentInfoProps {
  data: Post[];
  activeTab: string;
}

interface ContentItem {
  id: number;
  name: string;
  role: string;
  date: string;
  title: string;
  keywords: string;
}

const sampleCardData: ContentItem[] = [
  {
    id: 1,
    name: "Annette Black",
    role: "Moderator",
    date: "5th August, 2022",
    title: "Faith and Humility: A watchword for the woke generation",
    keywords: "8",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Contributor",
    date: "6th August, 2022",
    title: "The rise of technology and its impact on future generations",
    keywords: "10",
  },
  {
    id: 3,
    name: "Jane Smith",
    role: "Editor",
    date: "7th August, 2022",
    title:
      "Mindfulness and Productivity: How to manage stress in a fast-paced world",
    keywords: "5",
  },
  {
    id: 4,
    name: "Michael Johnson",
    role: "Author",
    date: "8th August, 2022",
    title: "Breaking the glass ceiling: Women in tech leadership",
    keywords: "12",
  },
  {
    id: 5,
    name: "Emily Clark",
    role: "Administrator",
    date: "9th August, 2022",
    title: "The importance of cybersecurity in the modern age",
    keywords: "7",
  },
];

const ContentInfo = ({ data, activeTab }: ContentInfoProps) => {
  // const [data, setData] = useState<ContentItem[]>([]); // Assuming the data is an array of strings

  // Simulate fetching data when activeTab changes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Simulate different data for different tabs
  //     let fetchedData: ContentItem[] = [];
  //     switch (activeTab) {
  //       case "Awaiting Approval":
  //         fetchedData = sampleCardData;
  //         break;
  //       case "Approved":
  //         fetchedData = sampleCardData;
  //         break;
  //       case "Declined":
  //         fetchedData = sampleCardData;
  //         break;
  //       case "Revoked":
  //         fetchedData = sampleCardData;
  //         break;
  //       default:
  //         fetchedData = [];
  //     }

  //     setData(fetchedData);
  //   };

  //   fetchData();
  // }, [activeTab]);

  const handleViewDetails = (id: string) => {
    alert(`View Details Clicked for card ID: ${id}`);
    console.log(id);
  };

  return (
    <div className="flex flex-col md:grid grid-cols-3 gap-5 py-4">
      {data.map((card) => (
        <ContentCard
          key={card._id}
          id={card._id}
          firstName={card.userDetails?.firstname}
          lastName={card.userDetails?.lastname}
          date={card.createdAt}
          title={card.title}
          activeTab={activeTab}
          keywords={card.keywordCount}
          reportCount={card.reportCount}
          onViewDetails={() => handleViewDetails(card._id)}
        />
      ))}
    </div>
  );
};

export default ContentInfo;
