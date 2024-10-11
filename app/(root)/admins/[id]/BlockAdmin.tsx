"use client"
import { useState } from "react";
import Image from 'next/image'



interface BlockProps {
  onClose: () => void;
  onSetReason: ( reason:Reason) => void;
}

export interface Reason {
  reason: "Active" | "Blocked";
  description: string;
  
}

const BlockAdmin = ({ onClose, onSetReason }: BlockProps ) => {
      const [reason, setReason] = useState<Reason['reason']>('Active')
      const [description,setDescription]=useState<Reason['description']>('')

      const isAllFilled = reason && description.trim() !== "";

 
    const handleReason = () => {
        if (isAllFilled) {
          onSetReason({ reason, description });
          onClose();
        }
      };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 w-[340px] h-[437px] rounded-[10px] gap-4">
      
      <div className="flex flex-row justify-start items-center"> 
        <Image src="/assets/icons/Group 1000002417.png" alt="Filter Icon" width={18} height={12.5} className="w-[18px] h-[12.5px] mr-2" />
        <h2 className="font-[20px] text-[#09192CCC]  ">Block Admin</h2>
      </div>
     
      <div className="space-y-4">
        <div>
          <label htmlFor="reason" className="block text-[#09192CCC] font-[14px]">
            Reason
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason["reason"])}
            className="mt-1 block w-[280px] h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm  sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
         <div>
          <label htmlFor="description" className="block text-[#09192CCC] font-[14px]">
            Description
          </label>
          <div className="mt-1 flex gap-[20px]">
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-[280px] h-[148px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm resize-none"
            />
          </div>
        </div>
    
      </div>
      <div className="mt-3 flex justify-center  items-center ">
        {/* <Button variant="outline" onClick={onClose}>
          Cancel
        </Button> */}
        <button onClick={handleReason} className={`w-[280px] h-[60px] ${isAllFilled? "bg-[#A52A2A]" :"bg-[#09192C33]"} rounded-[5px]`}>Block Admin</button>
      </div>
    </div>
  );
}

export default  BlockAdmin
