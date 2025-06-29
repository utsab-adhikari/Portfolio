"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface PrepType {
  _id: string;
  title: string;
  dayno: string;
  category: string;
  date: string;
  description: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
  prep: PrepType;
}

interface PrepDetailsProps {
  prepid: string;
}

const PrepDetails: React.FC<PrepDetailsProps> = ({ prepid }) => {
  const router = useRouter();
  const [prep, setPrep] = useState<PrepType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedPreps, setSelectedPreps] = useState<string[]>([]);
  useEffect(() => {
    const toastId = toast.loading("Loading Prep details...");
    axios
      .get<ApiResponse>(`/api/v1/admin/preps/details/${prepid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setPrep(res.data.prep);
          toast.success(res.data.message, { id: toastId });
        } else {
          toast.error(res.data.message, { id: toastId });
        }
      })
      .catch((err) => {
        console.error("Error fetching Prep:", err);
        toast.error("Unable to load Prep.", { id: toastId });
      })
      .finally(() => setLoading(false));
  }, [prepid]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-indigo-600" />
      </div>
    );
  }

  if (!prep) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">Prep not found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="px-3">
      <div
        className="max-w-3xl
    mx-3 mx-auto my-8 bg-white shadow-lg rounded-lg p-6"
      >
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{prep.title}</h1>
          <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
            {prep.category}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-6">
          <div>
            <p className="font-semibold">Date</p>
            <p>{format(new Date(prep.date), "PPP")}</p>
          </div>
          <div>
            <p className="font-semibold">Created At</p>
            <p>{format(new Date(prep.createdAt), "PPP p")}</p>
          </div>
          <div>
            <p className="font-semibold">Last Updated</p>
            <p>{format(new Date(prep.updatedAt), "PPP p")}</p>
          </div>
        </div>

        <div className="prose prose-indigo mb-6">
          <h2 className="text-lg font-semibold">Description</h2>
          <p>{prep.description}</p>
        </div>

      </div>
    </div>
  );
};

export default PrepDetails;
