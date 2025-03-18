"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UploadVideo = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { token } = useAuthContext();

  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!title) return toast.error("Please enter a video title.");
    if (!videoUrl) return toast.error("Please upload a video file.");

    try {
      setIsUploading(true);
      const res = await axios.post(
        `${apiUrl}/video/admin/new`,
        { url: videoUrl, title },
        { headers: { Authorization: token } }
      );

      if (res.status === 201) {
        toast.success("Video uploaded successfully.");
        router.push("/");
      } else {
        toast.error("Failed to upload video.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check if the file size exceeds 100MB (104857600 bytes)
    if (selectedFile.size > 104857600) {
      toast.error("File size exceeds 100MB. Please upload a smaller file.");
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const res = await axios.post(`${apiUrl}/auth/upload-image`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("Video URL generated successfully.");
        setVideoUrl(res.data.data.url); // Use returned URL for video
      } else if (res.status === 413) {
        toast.error("File size is too large.");
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="container mx-auto p-10  max-w-lg mt-20 bg-[#ffffff] rounded-[10px]">
      {/* <button
        onClick={() => router.push("/")}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Video List
      </button> */}

      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>

      <label className="block ">Video Title</label>
      <input
        type="text"
        className="border w-full p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter video Title"
      />

      {/* <label className="block mb-2">Video URL:</label>
      <input
        type="text"
        className="border w-full p-2 rounded mb-4"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL or upload a file"
      /> */}

      <label className="block mb-2">
        Upload Video File:{" "}
        <span className="text-[12px] text-red-500">
          File should not be more than 100mb
        </span>
      </label>
      <input
        type="file"
        accept="video/*"
        className="mb-4"
        onChange={handleFileUpload}
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`w-full px-4 py-2 rounded ${
          isUploading
            ? "bg-gray-400 cursor-not-allowed" // Gray background when disabled
            : "bg-[#A52A2A] hover:bg-[#722424] text-white"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
};

export default UploadVideo;
