"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReportId } from '@/app/actions/reactQuery'
import { Report } from '@/app/actions/type'
import { useAuthContext } from '@/app/context/AuthContext'

interface Props {
    id:string
    openModal: (action:string)=>void
  }



const Reporting = ({id, openModal}: Props)  => {


    const {token}=useAuthContext()
    const { data: content, isLoading, isError } = useReportId(id,token); 
    const [reportData, setReportData] = useState<Report | null>(null); 
    let showButton = false;
    let restore = false
    let decline = false



  useEffect(() => {
    // When content is fetched successfully, update the local state
    if (content && !isLoading && !isError) {
        const {data} =content
      setReportData(data as Report);
   
    }
  }, [content, isLoading, isError]);



  if(reportData && reportData.status === 'Pending'){
            showButton = true
    }
    
    if(reportData && reportData.status === 'Removed'){
        restore = true
    }

    if(reportData && reportData.status === 'Declined'){
        decline = true
    }
  // Show loading or error states
  if (isLoading) {
    return <div>Loading...</div>; // Add your custom loading indicator here
  }

  if (isError || !reportData) {
    return <div>Error loading report data. Please try again later.</div>; // Handle error states
  }
  return (
    <section className={`flex flex-col justify-between bg-white ${showButton? "h-[128%]" :"h-[95%] "} w-[800px] rounded-[10px] mx-12 my-8 px-12 py-8 `}>
   
       <div className='flex flex-col gap-y-4'>
            <div className='flex justify-between border-b '>
                <div>todays day</div>
                <div className={`w-[150px] h-[30px] rounded-[33px] flex justify-center items-center bg-gray-100 text-xs  px-4 mb-3 `}>{reportData.status}</div>
            </div>
            <div className='flex gap-3'>
                <div className='flex h-[50px] w-[50px] bg-[#A52A2A] rounded-full justify-center items-center font-bold'>{reportData.firstname[0]}{reportData.lastname[0]}</div>
                <div className='flex flex-col'>
                    <h1>{reportData.firstname} {reportData.lastname}</h1>
                    <p className='text-xs text-gray-500'>{reportData.email}</p>
                </div>
            </div>

            <div className='text-2xl text-[#09192CCC]'>
               {reportData.experienceDetails.title}
            </div>

            <div className='flex flex-col border-b gap-y-2 pb-4'>
                <p>{reportData.experienceDetails.message}
                </p>

              <div className=" flex justify-start gap-4">
                    <div className="flex items-center gap-2">
                        <Image
                        src= {'/assets/icons/Frame 15.png'}
                        alt='image'
                        width={26} height={2}
                        />
                        <p className="text-[#A52A2A] text-xs  hover:text-red-700">View</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src= {'/assets/icons/Frame 15.png'}
                            alt='image'
                            width={26} height={2}
                            />
                        <Link href={`/contents//${id}`}
                            
                            className="text-[#A52A2A] text-xs  hover:text-red-700"
                            >
                            Reports
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex flex-col border-b pb-4'>
                <div className='text-2xl text-[#09192CCC]'>
                Flagged Keywords
                </div>
                <div className='text-xl text-[#A52A2A]'>
                {reportData.keywordCount} Flagged Keywords
                </div>
                <div className='flex gap-3 mt-2'>
                    {reportData.unwantedKeywords && reportData.unwantedKeywords.map((keyword, index)=>{
                        return <div key={index} className='bg-[#F3F4F4] text-[#09192C] px-6 py-1'>{keyword}</div>
                    })}
                </div>
            </div>
          { decline && <div className='flex flex-col  gap-y-4'>
                    <div className='flex gap-3'>
                        <div className='flex h-[50px] w-[50px] bg-[#A52A2A] rounded-full justify-center items-center font-bold'>CW</div>
                        <div className='flex flex-col'>
                            <h1>Cameron Williamson</h1>
                            <p className='text-xs text-gray-500'>Content Creator</p>
                        </div>
                    </div>
                
                <div>Reason for decline</div>
                <div className='bg-[#F2F3F7] rounded-[5px] p-2'>
                    <p>
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                    </p>
                </div>
                <div className='flex flex-col items-end'>
                    <p>Declined</p>
                    <p>Today date is ...</p>
                </div>
            </div>}
       </div>
        {showButton && <div className='flex justify-center gap-4'>
            <button onClick={()=>openModal('Decline')} className='flex justify-center items-center w-[250px] h-[50px] rounded-[5px] bg-[#F3F4F4] text-[09192C]'>Decline</button>
            <button onClick={()=>openModal('Remove')} className='flex justify-center items-center w-[250px] h-[50px] rounded-[5px] bg-[#A52A2A] text-white'>Remove Post</button>

        </div>}
        {restore && <div className='flex justify-center gap-4'>
            <button onClick={()=>openModal('Restore')} className='flex justify-center items-center w-[250px] h-[50px] rounded-[5px] bg-[#A52A2A] text-white'>Restore</button>
        </div>}

  
    </section>
  )
}

export default Reporting
