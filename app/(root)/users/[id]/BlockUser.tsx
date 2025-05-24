"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/context/AuthContext";
import { useBlockUser, useUnblockUser } from "@/app/actions/reactQuery";

interface BlockProps {
  onClose: () => void;
  userId: string;
  onSetReason: (reason: Reason) => void;
  status: boolean | undefined;
}

export interface Reason {
  reason: "Active" | "Blocked";
  description: string;
}

const BlockUser = ({ userId, onClose, onSetReason, status }: BlockProps) => {
  const { token } = useAuthContext();
  const [reason, setReason] = useState<Reason["reason"]>("Active");
  const [description, setDescription] = useState<Reason["description"]>("");
  const { mutateAsync: blockUser, isPending: isload } = useBlockUser();
  const { mutateAsync: unBlockAdmin, isPending: loading } = useUnblockUser();

  const isAllFilled = reason && description.trim() !== "";

  const handleBlock = () => {
    blockUser({ userId, token });

    onClose();
  };

  const handleUnblock = () => {
    unBlockAdmin({ userId, token });
    onClose();
  };

  return (
    <div className="flex flex-col justify-between bg-white shadow-lg p-6 px-6  rounded-[10px] gap-4">
      <div className="flex flex-row justify-start items-center">
        <Image
          src="/assets/icons/Group 1000002417.png"
          alt="Filter Icon"
          width={18}
          height={12.5}
          className="w-[18px] h-[12.5px] mr-2"
        />
        <h2 className="font-[20px] text-[#09192CCC]  ">{status ? "Block User" : "Unblock User"}</h2>
      </div>

      <div className="space-y-4">
        {/* <div>
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
            className="mt-1 block w-[280px] h-[50px] rounded-[5px] border-[#A52A2A1A] px-2 border-[1px] shadow-sm  sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
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
              className="block w-[280px] h-[148px] rounded-[5px] px-2 border-[#A52A2A1A] border-[1px] shadow-sm sm:text-sm resize-none"
            />
          </div>
        </div> */}
        <p className="text-[14px] text-center">
          Are you sure you want to <span>{status ? "block" : "unblock"}</span>{" "}
          this user?
        </p>
      </div>
      <div className="mt-3 flex justify-center gap-3  items-center ">
        {/* <button className=""  onClick={onClose}>
          Cancel
        </button> */}

        <button
          onClick={onClose}
          className="bg-[#cccccc] px-5 py-3 rounded-[5px] text-black"
        >
          Cancel
        </button>
        <button
          onClick={status ? handleBlock : handleUnblock}
          className={`px-7 py-3 rounded-[5px] text-white ${
            status ? "bg-[#A52A2A]" : "bg-[#228B22]"
          }`}
        >
          {status ? "Block" : "Unblock"}
        </button>
      </div>
    </div>
  );
};

export default BlockUser;
