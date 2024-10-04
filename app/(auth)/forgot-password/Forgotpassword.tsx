import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForgotPassword } from "@/app/actions/reactQuery";



const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});





const Forgotpassword = () => {



  const [email, setEmail] = useState<string>('joomhndoe@gmail.com')
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const {mutateAsync:forgotPassword, isPending:isForgotPassword }= useForgotPassword()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = forgotSchema.safeParse({email})
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFormErrors(formattedErrors); 
      return;
    }

    setFormErrors({})

     await forgotPassword(email)

  }

  
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF] flex justify-center items-center">
        <Image
          src="/assets/images/logo.png" // Replace with your logo path
          width={300}
          height={300}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Reset Password
          </h1>
          <p className="text-lg text-[#384554] mb-6">
            Enter your email address and we will help you rest your password
          </p>

          <form onSubmit={handleSubmit} className="mt-2">
            <div>
              <label className="block text-[#384554]">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  name='email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="joomhndoe@gmail.com"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.email &&<span className="text-red-500 text-sm">{formErrors.email[0]}</span> }
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <Image
                    src="/assets/icons/email.png"
                    alt="lockicon"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
            <button className="w-full p-3 bg-[#A52A2A] text-white rounded-md mt-8">
             {isForgotPassword? "....." : "Forgot Pasword"}
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

export default Forgotpassword;
