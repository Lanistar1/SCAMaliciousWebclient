'use client '
import React, { useEffect, useState } from 'react'
import ReportInfo from './ReportInfo';
import { useReports } from '@/app/actions/reactQuery';
import { useAuthContext } from '@/app/context/AuthContext';

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('Reported Post');
  const { token } = useAuthContext(); 
  const [query, setQuery] = useState({
    status: 'Pending', 
    page: 1,
    limit: 9,
    token: token,
  });

  useEffect(() => {
    let status = 'Pending';
    switch (activeTab) {
      case 'Reported Post':
        status = 'Pending';
        break;
      case 'Active':
        status = 'Pending';
        break;
      case 'Removed':
        status = 'Pending';
        break;
      default:
        status = 'Pending';
    }
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: status,
    }));
  }, [activeTab]); 

  const { data:content, isLoading, isError } = useReports(query);
  const data = content?.data || [];
  const tabs = ['Reported Post','Active', 'Removed'];


    return (
     <section  className="bg-white min-h-screen rounded-[10px] mx-12 my-8 px-12 py-8 ">
        <div className="flex justify-between items-end border-b">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={` pb-2  ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600 font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
          <button className="flex items-center h-[50px] font-[Montserrat] px-4 py-2 border border-[#09192CCC] rounded-[5px] mb-4">
          <img src="/assets/icons/Group 1000002417.png" alt="Filter Icon" className="w-[18px] h-[12.5px] mr-2" />
          <span>Filter By</span>
          </button>
            </div>
        </div>

        {/* Loading and Error Handling */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data</p>}
        {data.length == 0 && <p>No data</p>}
  
       { data && data.length > 0 ? (<ReportInfo activeTab={activeTab} data={data}/>) :  <p>No reports found for this status.</p>}
       {/* { data && data.length > 0 ? (<ReportInfo activeTab={activeTab}/>) :  <p>No reports found for this status.</p>} */}
  
  
     </section>
    )
  }

export default ReportPage
