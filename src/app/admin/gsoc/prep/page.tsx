"use client";

import React, { useEffect, useState } from "react";
import CreatePrepDrawer from "./CreatePrepDrawer";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

type Prep = {
  title: string;
  category: string;
  date: string;
  time: string;
  description: string;
  isDone: boolean;
  _id: string;
  prepid: string;
};

const Preps = () => {
  const [Preps, setPreps] = useState<Prep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<string | null>(null);
  const [selectedPreps, setSelectedPreps] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Preps...");
    const getPrep = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/preps`);
        setPreps(response.data.preps);
        toast.success("Preps Loaded Successfully", { id: toastId });
      } catch (error: any) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPrep();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Preps</h1>
          <CreatePrepDrawer />
        </div>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-3xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : Preps.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Preps found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {Preps.map((Prep) => (
              <div
                key={Prep._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
              >
                <div className="absolute top-2 right-2">
                  {isDeleteLoading === Prep._id ? (
                    <button
                      disabled
                      className="font-bold animate-spin text-red-600 cursor-not-allowed"
                    >
                      <AiOutlineLoading3Quarters size={20} />
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleDelete(Prep._id)}
                      className="font-bold text-red-700 hover:text-red-500 transition"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  )}
                </div>

                <div className="absolute top-2 left-0 bg-indigo-700 text-white text-xs px-4 py-1 rounded-r-full shadow-sm">
                  {Prep.category}
                </div>

                <div className="flex-1 mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {Prep.title}
                  </h2>
                  <p className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-2">
                    {format(new Date(Prep.date), "PPP")} | {Prep.time}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <Link className=" text-sm flex items-center gap-2 bg-slate-300 px-3 py-1 rounded-full border border-indigo-600 hover:bg-slate-200 text-indigo-900" 
                  href={`/admin/Preps/details/${Prep._id}`}>
                    view <IoMdArrowDropright/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preps;
