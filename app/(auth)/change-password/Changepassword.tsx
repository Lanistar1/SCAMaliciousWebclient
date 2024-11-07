'use client'
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useChangePassword } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});


const Changepassword = () => {

  const [formData,setFormData] = useState({
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })

  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const {mutateAsync:changePassword,isPending:isChangingPassword} = useChangePassword()
  const {token,logout} = useAuthContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)  =>{
    const {name,value}= e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = changePasswordSchema.safeParse(formData)
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFormErrors(formattedErrors); 
      return;
    }

    setFormErrors({})

    try {
    // Attempt to change the password
    await changePassword({ oldPassword: formData.oldPassword, newPassword: formData.newPassword, token });
    // If successful, logout the user
    logout();
  } catch (error) {
    
  }

   
  }



  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF] justify-center items-center">
        <Image
          src="/assets/images/logo.png" // Replace with your logo path
          width={300}
          height={300}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-full  md:w-1/2 flex flex-col justify-center items-center relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Change Password
          </h1>
          <p className="text-lg text-[#384554] mb-6">
            Kindly keep your password safe
          </p>

          <form onSubmit={handleSubmit} className="mt-2">
            <div>
              <label className="block text-[#384554]">Current Password</label>
              <input
                type="password"
                name="old password"
                value={formData.oldPassword}
                onChange={handleInputChange}
                placeholder="Current Password"
                className="w-full p-3 mb-3 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            {formErrors.oldPassword &&<span className="text-red-500 text-sm">{formErrors.oldPassword[0]}</span> }
            <div>
              <label className="block text-[#384554]">New Password</label>
              <input
                type="password"
                name="new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New Password"
                className="w-full p-3 mb-3 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            {formErrors.newPassword &&<span className="text-red-500 text-sm">{formErrors.newPassword[0]}</span> }
            <div>
              <label className="block text-[#384554]">Confirm Password</label>
              <input
                type="password"
                name="confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full p-3 mb-6 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            {formErrors.confirmPassword &&<span className="text-red-500 text-sm">{formErrors.confirmPassword[0]}</span> }
            <button className="w-full p-3 bg-[#A52A2A] text-white rounded-md mt-3">
              Change Password
            </button>
          </form>
        </div>

        {/* Faint Logo at the bottom-right corner */}
        <div className="absolute bottom-8 right-8">
          <Image
            src="/assets/images/logofaint.png" // Replace with your faint logo path
            width={100}
            height={100}
            alt="Faint Logo"
            className="object-contain opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
