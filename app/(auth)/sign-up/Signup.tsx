'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCreateAccount,useSigninAccount } from "@/app/actions/reactQuery";
import { z } from "zod";
import { toast } from "react-toastify";


// Define the Zod schema for form validation
const signupSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ageBracket: z.enum(["18-30", "31-40", "41-50"], {
    errorMap: () => ({ message: "Invalid age bracket selected" }),
  }),
});

const Signup = () => {
 
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    ageBracket: "18-30", 
  });

 
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateAccount();
  const {mutateAsync:loginUser,isPending:isLoggingIn} = useSigninAccount()
 

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission with Zod validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = signupSchema.safeParse(formData);
    if (!result.success) {

      // Use `result.error.flatten()` to get field-specific errors
      const formattedErrors = result.error.flatten().fieldErrors;
      setFormErrors(formattedErrors); // Store formatted errors in `formErrors`
      return;
    }

    // Clear errors if validation is successful
    setFormErrors({});

    try {
      const response = await createUserAccount(formData);

      if(response.status !== 201){
        return toast.error('failed to create account, try again')
      }

      toast.success(`verification link sent to ${formData.email}`)
  
      
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF]  justify-center items-center">
        <div className="text-center">
          <Image src="/assets/images/logo.png" alt="SCAMalicious Logo" width={200} height={200} />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">Admin Registration</h1>
          <p className="text-lg text-[#384554] mb-6">Create new admin user</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#384554]">First Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="john"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.firstname && <span className="text-red-500 text-sm">{formErrors.firstname[0]}</span>}
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Last Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="doe"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.lastname && <span className="text-red-500 text-sm">{formErrors.lastname[0]}</span>}
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Username</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="johnny"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.username && <span className="text-red-500 text-sm">{formErrors.username[0]}</span>}
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email[0]}</span>}
              </div>
            </div>
            <div>
              <label className="block text-[#384554]">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.password && <span className="text-red-500 text-sm">{formErrors.password[0]}</span>}
              </div>
            </div>

            {/* Age Bracket Dropdown */}
            <div>
              <label className="block text-[#384554]">Age Bracket</label>
              <div className="relative mt-1">
                <select
                  name="ageBracket"
                  value={formData.ageBracket}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                >
                  <option value="18-30">18-30</option>
                  <option value="31-40">31-40</option>
                  <option value="41-50">41-50</option>
                </select>
                {formErrors.ageBracket && <span className="text-red-500 text-sm">{formErrors.ageBracket[0]}</span>}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#A52A2A] text-white text-base rounded-md" disabled={isCreatingAccount}>
                {isCreatingAccount ? "Creating Account..." : "Create Account"}
            </button>

            <div className="flex justify-center items-center mb-3 mt-2">
              <p className="text-sm font-normal text-[#384554]">Already have an account?</p>
              <Link href="/sign-in">
                <p className="text-sm font-medium text-[#A52A2A] ml-1">Sign In</p>
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Right Image */}
        <div className="absolute bottom-4 right-4">
          <Image src="/assets/images/logofaint.png" alt="SCAMalicious Logo" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
