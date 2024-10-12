"use client"
import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { useReportDecline, useReportRemove, useReportRestore } from "@/app/actions/reactQuery";
import { toast } from "react-toastify";



interface ReportProps {
  onClose: () => void;
  // onSetReason: ( reason:Reason) => void;
  action:string
  id:string
}

export interface Reason {
  reason: "Active" | "Blocked";
  description: string;
  
}

const ReportBox = ({ onClose,action,id }: ReportProps ) => {
      const {token} = useAuthContext()
      const [reason, setReason] = useState<Reason['reason']>('Active')
      const [description,setDescription]=useState<Reason['description']>('')
      const {mutateAsync:declineReport, isPending} = useReportDecline()
      const {mutateAsync:removeReport,isPending:isloading} = useReportRemove()
      const{mutateAsync:restoreReport,isPending:isload} = useReportRestore()

      const isAllFilled = reason && description.trim() !== "";

 
    const handleAction = () => {
        if (!isAllFilled) {
         toast.error('fill the inpt box')
          return
        }

        if(action==="Decline"){
          declineReport({id,reason,description,token})
        }
        if(action==="Remove"){
          removeReport({id,token})
        }
        if(action==="Restore"){
          restoreReport({id,reason,description,token})}
        onClose();
      };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 w-[523px] h-[437px] rounded-[10px] gap-4">
      
      <div className="flex flex-row justify-start items-center"> 
        <h2 className="font-[20px] text-[#09192CCC]  ">{action}</h2>
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
            className="mt-1 block w-full h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm  sm:text-sm"
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
              className="block w-full h-[148px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm resize-none"
            />
          </div>
        </div>
    
      </div>
      <div className="mt-3 flex justify-center  items-center gap-3">
        {/* <Button variant="outline" onClick={onClose}>
          Cancel
        </Button> */}
        <button onClick={onClose} className={`w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]`}>Cancel</button>
        <button onClick={handleAction} className={`w-[280px] h-[60px] ${isAllFilled? "bg-[#A52A2A]" :"bg-[#09192C33]"} rounded-[5px]`}>Submit</button>
      </div>
    </div>
  );
}

export default  ReportBox