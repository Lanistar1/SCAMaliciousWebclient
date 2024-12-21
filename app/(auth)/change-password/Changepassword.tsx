"use client";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useChangePassword } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";

// Validation schema with enhanced password rules
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// const changePasswordSchema = z
//   .object({
//     oldPassword: z.string().min(6, "Password must be at least 6 characters"),
//     newPassword: z
//       .string()
//       .regex(
//         passwordRegex,
//         "Password must be at least 8 characters, include a number, and a special character"
//       ),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

const Changepassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useChangePassword();
  const { token, logout } = useAuthContext();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const result = changePasswordSchema.safeParse(formData);
    // if (!result.success) {
    //   const formattedErrors = result.error.flatten().fieldErrors;
    //   setFormErrors(formattedErrors);
    //   return;
    // }

    setFormErrors({});

    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token,
      });
      toast.success("Password changed successfully!");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#023A5F] via-[#606CB6] to-[#9493DF] justify-center items-center">
        <Image
          src="/assets/images/logo.png"
          width={300}
          height={300}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative">
        <div className="w-2/3">
          <h1 className="text-3xl text-[#A52A2A] font-normal mb-1">
            Change Password
          </h1>
          <p className="text-lg text-[#384554] mb-6">
            Kindly keep your password safe
          </p>

          <p className="text-[14px] text-[#222222]">
            Password must be at least 8 characters, include a number, and a
            special character.
          </p>

          <form onSubmit={handleSubmit} className="mt-2">
            {/* Current Password */}
            <div>
              <label className="block text-[#384554]">Current Password</label>
              <div className="relative mt-1">
                <input
                  type={passwordVisibility.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="w-full p-3 mb-1 rounded-md focus:outline-none focus:border-gray-400"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  <Image
                    src={
                      passwordVisibility.oldPassword
                        ? "/assets/icons/eyedd.png"
                        : "/assets/icons/eyezz.png"
                    }
                    alt="toggle visibility icon"
                    width={20}
                    height={20}
                  />
                </span>
                {formErrors.oldPassword && (
                  <span className="text-red-500 text-sm">
                    {formErrors.oldPassword[0]}
                  </span>
                )}
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[#384554]">New Password</label>
              <div className="relative mt-1">
                <input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="w-full p-3 mb-1 rounded-md focus:outline-none focus:border-gray-400"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  <Image
                    src={
                      passwordVisibility.newPassword
                        ? "/assets/icons/eyedd.png"
                        : "/assets/icons/eyezz.png"
                    }
                    alt="toggle visibility icon"
                    width={20}
                    height={20}
                  />
                </span>
                {formErrors.newPassword && (
                  <span className="text-red-500 text-sm">
                    {formErrors.newPassword[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#384554]">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full p-3 mb-1 rounded-md focus:outline-none focus:border-gray-400"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  <Image
                    src={
                      passwordVisibility.confirmPassword
                        ? "/assets/icons/eyedd.png"
                        : "/assets/icons/eyezz.png"
                    }
                    alt="toggle visibility icon"
                    width={20}
                    height={20}
                  />
                </span>
                {formErrors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {formErrors.confirmPassword[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-[#A52A2A] text-white rounded-md mt-3"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Faint Logo at the bottom-right corner */}
        <div className="absolute bottom-8 right-8">
          <Image
            src="/assets/images/logofaint.png"
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
