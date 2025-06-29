"use client";

import React, { useEffect, useState } from "react";
import CreateTaskDrawer from "./CreateTaskDrawer";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

type Task = {
  title: string;
  category: string;
  date: string;
  time: string;
  description: string;
  isDone: boolean;
  _id: string;
  taskid: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Tasks...");
    const getTask = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/tasks`);
        setTasks(response.data.tasks);
        toast.success("Tasks Loaded Successfully", { id: toastId });
      } catch (error: any) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTask();
  }, []);

  const handleCheckboxChange = async (taskid: string) => {
    const toastId = toast.loading("Task Updating...");
    const isSelected = selectedTasks.includes(taskid);
    const updatedSelection = isSelected
      ? selectedTasks.filter((id) => id !== taskid)
      : [...selectedTasks, taskid];

    setSelectedTasks(updatedSelection);
    try {
      const res = await axios.put(`/api/v1/admin/tasks/done/${taskid}`, {
        isDone: !isSelected, // Toggle the current state
      });

      toast.success(res.data.message, { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      // Optionally revert UI if the request fails
      setSelectedTasks(
        isSelected
          ? [...updatedSelection, taskid]
          : updatedSelection.filter((id) => id !== taskid)
      );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Tasks</h1>
          <CreateTaskDrawer />
        </div>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-3xl text-gray-400 flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No tasks found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
              >
                <div className="absolute top-2 right-2">
                  {isDeleteLoading === task._id ? (
                    <button
                      disabled
                      className="font-bold animate-spin text-red-600 cursor-not-allowed"
                    >
                      <AiOutlineLoading3Quarters size={20} />
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleDelete(task._id)}
                      className="font-bold text-red-700 hover:text-red-500 transition"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  )}
                </div>

                <div className="absolute top-2 left-0 bg-indigo-700 text-white text-xs px-4 py-1 rounded-r-full shadow-sm">
                  {task.category}
                </div>

                <div className="flex-1 mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-2">
                    {format(new Date(task.date), "PPP")} | {task.time}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2 mt-auto">
                    <input
                      type="checkbox"
                      id={task._id}
                      checked={task.isDone || selectedTasks.includes(task._id)}
                      onChange={() => handleCheckboxChange(task._id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label
                      htmlFor={task._id}
                      className="text-sm text-gray-700 select-none"
                    >
                      {task.isDone || selectedTasks.includes(task._id)
                        ? "Task Completed"
                        : "Mark as Done"}
                    </label>
                  </div>
                  <Link className=" text-sm flex items-center gap-2 bg-slate-300 px-3 py-1 rounded-full border border-indigo-600 hover:bg-slate-200 text-indigo-900" 
                  href={`/admin/tasks/details/${task._id}`}>
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

export default Tasks;
