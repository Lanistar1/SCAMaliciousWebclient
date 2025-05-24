'use client'
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useResetPassword } from "@/app/actions/reactQuery";
import { useRouter } from "next/navigation";

const resetSchema = z.object({
  code:z.number(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});


const Resetpassword = () => {

  const [formData,setFormData] = useState({
    code:"",
    newPassword:"",
    confirmPassword:""
  })

  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const {mutateAsync:resetPassword,isPending:isResetting} = useResetPassword()
  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)  =>{
    const {name,value}= e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }


  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = resetSchema.safeParse(formData)
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFormErrors(formattedErrors); 
      return;
    }

    if(formData.confirmPassword !== formData.newPassword){
      setFormErrors({confirmPasword:['Password does not match']})
      return
    }

    setFormErrors({})

    try{

      await resetPassword({code:formData.code,newPassword:formData.newPassword})
      router.push('/login')

    }catch(error){

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
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Reset Password
          </h1>
          <p className="text-lg font-normal text-[#384554] mb-6">
            Kindly keep your password safe
          </p>
          <form  onSubmit={handleSubmit} className="mt-2">
            <div>
              <label className="block text-[#384554]">New Password</label>
              <input
                type="password"
                name='New Password'
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New Password"
                className="w-full p-3 mb-3 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            {formErrors.newPasword &&<span className="text-red-500 text-sm">{formErrors.newPasword[0]}</span> }
            <div>
              <label className="block text-[#384554]">Confirm Password</label>
              <input
                type="password"
                name='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full p-3 mb-6 rounded-md focus:outline-none focus:border-gray-400 mt-1"
              />
            </div>
            {formErrors.confirmPasword &&<span className="text-red-500 text-sm">{formErrors.confirmPasword[0]}</span> }
            <button className="w-full p-3 bg-[#A52A2A] text-white rounded-md mt-3">
             {isResetting ? "Reseting...": 'Reset Password'}
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

export default Resetpassword;
