"use client";
import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  usePostDecline,
  usePostApprove,
  useReportRestore,
} from "@/app/actions/reactQuery";
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

const ContentBox = ({ onClose, action, id }: ReportProps) => {
  const { token } = useAuthContext();
  const [reason, setReason] = useState<Reason["reason"]>("Active");
  const [description, setDescription] = useState<Reason["description"]>("");
  const { mutateAsync: declineReport, isPending } = usePostDecline();
  const { mutateAsync: approveReport, isPending: isloading } = usePostApprove();
  const { mutateAsync: restoreReport, isPending: isload } = useReportRestore();

  const isAllFilled = reason && description.trim() !== "";

  let approvePost = false;

  const handleAction = () => {
    if (!isAllFilled && action !== "Approve") {
      toast.error("Fill in the input box");
      return;
    }

    if (action === "Decline") {
      declineReport({ id, reason, description, token });
    }
    if (action === "Approve") {
      approveReport({ id, token });
      approvePost = true;
    }
    if (action === "Restore") {
      restoreReport({ id, reason, description, token });
    }
    onClose();
  };

  return (
    <div className="flex flex-col bg-white shadow-lg p-6 w-[350px] md:w-[523px] h-[437px] rounded-[10px] gap-4">
      <div className="flex flex-row justify-start items-center">
        <h2 className="font-[20px] text-[#09192CCC]">{action}</h2>
      </div>

      {/* Conditionally show content for approve action */}
      {action === "Approve" ? (
        <div className="space-y-4">
          <p className="text-[#09192CCC] font-[14px]">
            Are you sure you want to approve this content?
          </p>
          <div className="mt-3 flex justify-center items-center gap-3">
            <button
              onClick={onClose}
              className="w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAction}
              className={`w-[280px] h-[60px] ${"bg-[#A52A2A]"} rounded-[5px]`}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        // Original content for Decline and Restore actions
        <>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="reason"
                className="block text-[#09192CCC] font-[14px]"
              >
                Reason
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value as Reason["reason"])}
                className="mt-1 block w-full h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm sm:text-sm"
              >
                <option value="Violates platform&apos;s community guidelines">
                  Violates platform&apos;s community guidelines
                </option>
                <option value="Contains misleading or false information">
                  Contains misleading or false information
                </option>
                <option value="Hate speech or discrimination">
                  Hate speech or discrimination
                </option>
                <option value="Harassment or bullying">Harassment or bullying</option>
                <option value="Personal attacks or defamation">
                  Personal attacks or defamation
                </option>
                <option value="Duplicate content or reposting">
                  Duplicate content or reposting
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-[#09192CCC] font-[14px]"
              >
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
          <div className="mt-3 flex justify-center items-center gap-3">
            <button
              onClick={onClose}
              className="w-[280px] h-[60px] bg-[#09192C33] rounded-[5px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAction}
              className={`w-[280px] h-[60px] ${
                isAllFilled ? "bg-[#A52A2A]" : "bg-[#09192C33]"
              } rounded-[5px]`}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentBox;
