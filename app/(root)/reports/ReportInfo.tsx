'use client'
import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';


interface Report {
  _id: string;
  email: string;
  reasonReportedTitle: string;
  reasonReportedBody: string;
  firstname: string;
  lastname: string;
  userId: string;
  userDetails: string | null;
  experienceId: string;
  experienceDetails: ExperienceDetails;
  adminId: string;
  adminReasonDecision: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  keywordCount: number;
}

interface ExperienceDetails {
  _id: string;
  message: string;
  title: string;
}


interface ContentInfoProps {
    data: Report[],
    activeTab:string

  }

  interface ContentItem {
    id: number;
    name: string;
    role: string;
    date: string;
    title: string;
    keywords: string; 
  }

const sampleCardData : ContentItem[] = [

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
      title: "Mindfulness and Productivity: How to manage stress in a fast-paced world",
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

const ReportInfo = ({ data, activeTab }: ContentInfoProps) => { 
    
    // const [data, setData] = useState<ContentItem[]>([]); // Assuming the data is an array of strings

    // // Simulate fetching data when activeTab changes
    // useEffect(() => {
    //   const fetchData = async () => {
    //     // Simulate different data for different tabs
    //     let fetchedData: ContentItem[] = [];
    //     switch (activeTab) {
    //       case 'Awaiting Approval':
    //         fetchedData = sampleCardData
    //         break;
    //       case 'Approved':
    //         fetchedData = sampleCardData
    //         break;
    //       case 'Declined':
    //         fetchedData = sampleCardData
    //         break;
    //       case 'Revoked':
    //         fetchedData =sampleCardData
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
      };
    
      return (
        <div className="grid grid-cols-3 gap-10 py-4">
          {data.map((card) => (
            <ReportCard
              key={card._id}
              id={card.experienceId}
              name={card.firstname}
              role={card.experienceDetails.title}
              date={card.createdAt}
              title={card.experienceDetails.title}
              activeTab={activeTab}
              keywords={card.keywordCount}
              onViewDetails={() => handleViewDetails(card._id)}
            />
          ))}
        </div>
  )
}

export default ReportInfo
