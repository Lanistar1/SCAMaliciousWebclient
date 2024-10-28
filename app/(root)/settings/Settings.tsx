"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useCreateAdmin,
  useUnwantedKeyword,
  useCreateKeywords,
} from "@/app/actions/reactQuery";
import { z } from "zod";
import { toast } from "react-toastify";
import { useAuthContext } from "@/app/context/AuthContext";

// Define the Zod schema for form validation
const createAdminSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

const Settings = () => {
  const { token } = useAuthContext();

  //const keywords = ["hate", "joy", "love", "kiss"];
  const [show, setShow] = useState(false);
  const [keywordText, setKeywordText] = useState("");
  const [showKeyword, setShowKeyword] = useState(false);
  const [showAdmin, setShowAdmin] = useState(true); // Set to true by default

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  

  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const { mutateAsync: createAdminAccount, isPending: isCreatingAccount } =
    useCreateAdmin(token);

  const { mutateAsync: createKeywords, isPending: isCreatingKeywords } =
    useCreateKeywords(token);

  // Handle form input changes
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle button clicks to toggle visibility
  const handleToggle = (section: string) => {
    setShow(section === "configure");
    setShowKeyword(section === "keyword");
    setShowAdmin(section === "admin");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = createAdminSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setFormErrors(formattedErrors);
      return;
    }

    setFormErrors({});

    try {
      const response = await createAdminAccount(formData);

      if (response.status !== 201) {
        return toast.error("Failed to create admin, try again");
      }

      toast.success("Admin created successfully.");

      // Clear the form fields on successful creation
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
      });
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  // ============= Add keywords endpoint call ===========
  const handleAddKeywords = async () => {
    const keywordsArray = keywordText
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);

    const keywordPayload = { keyword: keywordsArray };

    try {
      const response = await createKeywords(keywordPayload);

      if (response.status !== 201) {
        return toast.error("Failed to create keywords, try again");
      }

      toast.success("Keywords created successfully.");

      setKeywordText(""); // Clear the textarea input field
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  // ============ fetching unwanted keywords data ========
  const [query, setQuery] = useState({
    status: "active",
    page: 1,
    limit: 6,
    token: "",
  });

  useEffect(() => {
    if (token) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        token: token,
      }));
    }
  }, [token]);

  const {
    data: content,
    isLoading,
    isError,
  } = useUnwantedKeyword(
    query.token && query.status
      ? query
      : {
          status: "active",
          page: 1,
          limit: 6,
          token: "",
        }
  );

  const keywords = content?.data?.keyword || [];
  // ============= end ========================

  return (
    <div className="flex flex-row p-12 h-screen">
      {/* Left hand side */}
      <section className="flex flex-col gap-y-6 w-[30%] border-r text-[#3A4756]">
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-[16px]">Flagged Keywords</h1>
          <div>
            <p className="text-[14px]">Configure keywords to be flagged</p>
            <p className="text-[14px]">by the system automatically</p>
          </div>
          <button
            onClick={() => handleToggle("configure")}
            className="rounded-[15px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px] text-[14px]"
          >
            Configure
          </button>
        </div>

        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-[16px]">Add new Admin</h1>
          <div>
            <p className="text-[14px]">
              Click on the button below to add new admin
            </p>
            <p className="text-[14px]">to the system</p>
          </div>
          <button
            onClick={() => handleToggle("admin")}
            className="rounded-[15px] text-[14px] flex justify-center items-center bg-[#F6EAEA] text-[#A52A2A] w-[165px] h-[40px]"
          >
            Add Admin
          </button>
        </div>
      </section>

      {/* Right hand side */}
      <section className="pl-24 text-[#3A4756] flex-grow">
        {/* Configure Keywords */}
        {show && (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl">Flagged Keywords</h1>
              <div>
                <p>Add new keyword</p>
                <textarea
                  id="description"
                  placeholder="E.g nigga, hate, love, joy"
                  className="h-[148px] w-[500px] rounded-[5px] bg-[#FBFBFB] border-[2px] p-5 resize-none"
                  value={keywordText}
                  onChange={(e) => setKeywordText(e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-2 flex-wrap">
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p>Error loading data</p>
                ) : keywords.length === 0 ? (
                  <p>No data found for unwanted keyword</p>
                ) : (
                  keywords.map((keyword: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center bg-[#ffffff] text-[#09192C] px-4 py-1 rounded-[10px] border border-[#F3E9E9]"
                    >
                      <span className="mr-2 text-center">{keyword}</span>
                      <Image
                        src="/assets/icons/Icon.png"
                        width={10}
                        height={10}
                        alt="cancel"
                        className="cursor-pointer mt-1"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="w-[500px] h-[50px] rounded-[5px] bg-[#A52A2A] text-white"
                onClick={handleAddKeywords}
              >
                {isCreatingKeywords ? "Adding new Keywords..." : "Add Keywords"}
              </button>
            </div>
          </div>
        )}

        {/* Add Admin */}
        {showAdmin && (
          <div className="min-w-full flex flex-col bg-gray-100">
            <h1 className="text-xl text-[#3A4756] font-normal mb-1">
              Add New Admin
            </h1>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#384554]">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.firstname && (
                  <span className="text-red-500 text-sm">
                    {formErrors.firstname[0]}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#384554]">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.lastname && (
                  <span className="text-red-500 text-sm">
                    {formErrors.lastname[0]}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#384554]">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="johndoe"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.username && (
                  <span className="text-red-500 text-sm">
                    {formErrors.username[0]}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-[#384554]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-gray-400"
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm">
                    {formErrors.email[0]}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#A52A2A] text-white text-base rounded-md"
                disabled={isCreatingAccount}
              >
                {isCreatingAccount ? "Adding new Admin..." : "Add Admin"}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Settings;
