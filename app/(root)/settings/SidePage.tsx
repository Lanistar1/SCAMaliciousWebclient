import React from 'react'

const SidePage = () => {
  return (
    <section className='flex flex-col gap-y-6 w-[30%] border-r text-[#3A4756]'>

      <div className='flex flex-col gap-y-3 items-start'>
      <h1 className='text-xl '>
        Flagged Keywords
      </h1>
      <div>
      <p>Configure keywords to be flagged</p>
      <p>by the system automatically</p>
      </div>
      <button className='rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]'>
        Configure
      </button>
      </div>

      <div className='flex flex-col gap-y-3 items-start'>
      <h1 className='text-xl '>
        Restrict Access
      </h1>
      <div>
      <p>Restric user access within </p>
      <p>the scammalicious app</p>
      </div>
      <button className='rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]'>
        Configure
      </button>
      </div>

      <div className='flex flex-col gap-y-3 items-start'>
      <h1 className='text-xl '>
        Change Password
      </h1>
      <div>
      <p>Do you want to change your Password?</p>
      <p>Tap to Password?</p>
      </div>
      <button className='rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]'>
        Add Admin
      </button>
      </div>
        
    </section>
  )
}

export default SidePage
