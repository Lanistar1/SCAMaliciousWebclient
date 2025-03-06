"use client";
import React, { useState } from "react";
import axios from "axios";
import { useFetchVideo } from "@/app/actions/reactQuery";
import { useAuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Video {
  _id: string;
  url: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const VideoList = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { token } = useAuthContext();
  const { data: response, isLoading, isError, refetch } = useFetchVideo(token);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading videos.</div>;

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      setIsUpdating(true);
      const endpoint =
        status === "ACTIVE"
          ? `${apiUrl}/video/admin/deactivate/${id}`
          : `${apiUrl}/video/admin/activate/${id}`;

      const res = await axios.put(
        endpoint,
        {},
        { headers: { Authorization: token } }
      );

      if (res.status === 201) {
        toast.success(
          `Video ${
            status === "ACTIVE" ? "archived" : "unarchived"
          } successfully.`
        );
        refetch(); // Refresh the list
      } else {
        toast.error("Failed to update video status.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Error: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsUpdating(true);
      const endpoint = `${apiUrl}/video/admin/remove/${id}`;

      const res = await axios.delete(endpoint, {
        headers: { Authorization: token },
      });

      if (res.status === 200) {
        toast.success("Video deleted successfully.");
        window.location.reload();
      } else {
        toast.error("Failed to update video status.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Error: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-6 p-6">
      <button
        onClick={() => router.push("/upload-video")}
        className="mb-4 bg-[#A52A2A] text-white px-4 py-2 rounded hover:bg-[#722424]"
      >
        Upload Video
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {response?.data?.map((video: Video) => (
          <div key={video._id} className="bg-white shadow-lg rounded p-4">
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p
              className={`text-sm ${
                video.status === "ACTIVE" ? "text-green-600" : "text-red-600"
              }`}
            >
              {video.status}
            </p>
            <video
              className="w-full h-40 mt-2 rounded"
              controls
              src={video.url}
            ></video>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPlayingVideo(video.url)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Play
              </button>
              <button
                onClick={() => handleDelete(video._id)}
                className="bg-[#325403] text-white px-4 py-2 rounded hover:bg-[#325403]"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdateStatus(video._id, video.status)}
                disabled={isUpdating}
                className={`px-4 py-2 rounded text-white ${
                  video.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {isUpdating
                  ? "Processing..."
                  : video.status === "ACTIVE"
                  ? "Archive"
                  : "Unarchive"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-2">Now Playing</h3>
            <video
              className="w-full rounded"
              controls
              src={playingVideo}
            ></video>
            <button
              onClick={() => setPlayingVideo(null)}
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;
