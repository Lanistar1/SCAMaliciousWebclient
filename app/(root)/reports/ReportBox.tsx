"use client";
import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { useReportDecline, useReportRemove, useReportRestore } from "@/app/actions/reactQuery";
import { toast } from "react-toastify";

interface ReportProps {
  onClose: () => void;
  action: string;
  id: string;
}

export interface Reason {
  reason: "Active" | "Blocked";
  description: string;
}

const ReportBox = ({ onClose, action, id }: ReportProps) => {
  const { token } = useAuthContext();
  const [reason, setReason] = useState<Reason['reason']>('Active');
  const [description, setDescription] = useState<Reason['description']>('');
  const { mutateAsync: declineReport, isPending } = useReportDecline();
  const { mutateAsync: removeReport, isPending: isloading } = useReportRemove();
  const { mutateAsync: restoreReport, isPending: isload } = useReportRestore();

  const isAllFilled = reason && description.trim() !== "";

  const handleAction = () => {
    if (!isAllFilled) {
      toast.error('Fill in the input box');
      return;
    }

    if (action === "Decline") {
      declineReport({ id, reason, description, token });
    }
    if (action === "Remove") {
      removeReport({ id, token });
    }
    if (action === "Restore") {
      restoreReport({ id, reason, description, token });
    }
    onClose();
  };

  // Phase 1: Approve action
  if (action === "Approve") {
    return (
      <div className="flex flex-col bg-white shadow-lg p-6 w-[350px] md:w-[523px] h-[437px] rounded-[10px] gap-4">
        <div className="flex flex-row justify-start items-center">
          <h2 className="font-[20px] text-[#09192CCC]">Approve</h2>
        </div>
        <p className="text-[#09192CCC]">Are you sure you want to approve this report?</p>
        <div className="mt-3 flex justify-center items-center gap-3">
          <button onClick={onClose} className="w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]">Cancel</button>
          <button
            onClick={handleAction}
            className={`w-[280px] h-[60px] ${isAllFilled ? "bg-[#A52A2A]" : "bg-[#09192C33]"} rounded-[5px]`}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Phase 2: Decline action
  if (action === "Decline") {
    return (
      <div className="flex flex-col bg-white shadow-lg p-6 w-[350px] md:w-[523px] h-[437px] rounded-[10px] gap-4">
        <div className="flex flex-row justify-start items-center">
          <h2 className="font-[20px] text-[#09192CCC]">Decline</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="reason" className="block text-[#09192CCC] font-[14px]">Reason</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as Reason["reason"])}
              className="mt-1 block w-full h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm sm:text-sm"
            >
              <option value="Report lacks sufficient evidence or context">Report lacks sufficient evidence or context</option>
              <option value="Content does not violate platform&apos;s guidelines">Content does not violate platform&apos;s guidelines</option>

              <option value="Report is based on personal disagreement or bias">Report is based on personal disagreement or bias</option>
              <option value="Content has already been reviewed and approved">Content has already been reviewed and approved</option>
              <option value="Content is protected under freedom of speech">Content is protected under freedom of speech</option>
              <option value="Reported issue is not actionable under current guidelines">Reported issue is not actionable under current guidelines</option>
              <option value="No clear violation of community standards">No clear violation of community standards</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-[#09192CCC] font-[14px]">Description</label>
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
        <div className="mt-3 flex justify-center items-center gap-3">
          <button onClick={onClose} className="w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]">Cancel</button>
          <button
            onClick={handleAction}
            className={`w-[280px] h-[60px] ${isAllFilled ? "bg-[#A52A2A]" : "bg-[#09192C33]"} rounded-[5px]`}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Phase 3: Restore action
  if (action === "Restore") {
    return (
      <div className="flex flex-col bg-white shadow-lg p-6 w-[350px] md:w-[523px] h-[437px] rounded-[10px] gap-4">
        <div className="flex flex-row justify-start items-center">
          <h2 className="font-[20px] text-[#09192CCC]">Restore</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="reason" className="block text-[#09192CCC] font-[14px]">Reason</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as Reason["reason"])}
              className="mt-1 block w-full h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm sm:text-sm"
            >
              <option value="Content was removed in error">Content was removed in error</option>
              <option value="Content does not violate platform&apos;s guidelines upon further review">Content does not violate platform&apos;s guidelines upon further review</option>
              <option value="Report or complaint was invalid or false">Report or complaint was invalid or false</option>
              <option value="Content was removed due to a misunderstanding or misinterpretation">Content was removed due to a misunderstanding or misinterpretation</option>
              <option value="Content falls within the acceptable scope after clarification">Content falls within the acceptable scope after clarification</option>
              <option value="The issue raised was resolved, and no violation was found">The issue raised was resolved, and no violation was found</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-[#09192CCC] font-[14px]">Description</label>
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
        <div className="mt-3 flex justify-center items-center gap-3">
          <button onClick={onClose} className="w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]">Cancel</button>
          <button
            onClick={handleAction}
            className={`w-[280px] h-[60px] ${isAllFilled ? "bg-[#A52A2A]" : "bg-[#09192C33]"} rounded-[5px]`}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return null; // If no action is matched
};

export default ReportBox;
