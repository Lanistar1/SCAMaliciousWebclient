import React from "react";

const SidePage = () => {
  return (
    <section className="flex flex-col gap-y-6 w-[30%] border-r text-[#3A4756]">
      <div className="flex flex-col gap-y-3 items-start">
        <h1 className="text-[16px] ">Flagged Keywords</h1>
        <div>
          <p className="text-[14px] ">Configure keywords to be flagged</p>
          <p className="text-[14px] ">by the system automatically</p>
        </div>
        <button className="rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px] text-[14px]">
          Configure
        </button>
      </div>

      <div className="flex flex-col gap-y-3 items-start">
        <h1 className="text-[16px] ">Add new Admin</h1>
        <div>
          <p className="text-[14px] ">Click on the button below to add new admin </p>
          <p className="text-[14px] ">to the system</p>
        </div>
        <button className="rounded-[15px] text-[14px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]">
          Add Admin
        </button>
      </div>

      {/* <div className="flex flex-col gap-y-3 items-start">
        <h1 className="text-xl ">Change Password</h1>
        <div>
          <p>Do you want to change your Password?</p>
          <p>Tap to Password?</p>
        </div>
        <button className="rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]">
          Add Admin
        </button>
      </div> */}
    </section>
  );
};

export default SidePage;
