'use client '
import React, { useState } from 'react'
import ContentInfo from './ContentInfo';


const ContentPage = () => {
  
  const [activeTab, setActiveTab] = useState('Awaiting Approval');
  const tabs = ['Awaiting Approval', 'Approved', 'Declined', 'Revoked'];
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

      <ContentInfo activeTab={activeTab}/>


   </section>
  )
}

export default ContentPage