"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface TaskType {
  _id: string;
  title: string;
  category: string;
  date: string;
  isDone: boolean;
  time: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
  task: TaskType;
}

interface TaskDetailsProps {
  taskid: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskid }) => {
  const router = useRouter();
  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  useEffect(() => {
    const toastId = toast.loading("Loading task details...");
    axios
      .get<ApiResponse>(`/api/v1/admin/tasks/details/${taskid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setTask(res.data.task);
          toast.success(res.data.message, { id: toastId });
        } else {
          toast.error(res.data.message, { id: toastId });
        }
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        toast.error("Unable to load task.", { id: toastId });
      })
      .finally(() => setLoading(false));
  }, [taskid]);

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

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-indigo-600" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">Task not found.</p>
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
          <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
          <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
            {task.category}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-6">
          <div>
            <p className="font-semibold">Date</p>
            <p>{format(new Date(task.date), "PPP")}</p>
          </div>
          <div>
            <p className="font-semibold">Time</p>
            <p>{task.time}</p>
          </div>
          <div>
            <p className="font-semibold">Created At</p>
            <p>{format(new Date(task.createdAt), "PPP p")}</p>
          </div>
          <div>
            <p className="font-semibold">Last Updated</p>
            <p>{format(new Date(task.updatedAt), "PPP p")}</p>
          </div>
        </div>

        <div className="prose prose-indigo mb-6">
          <h2 className="text-lg font-semibold">Description</h2>
          <p>{task.description}</p>
        </div>

        <div className="flex flex-col space-x-3 items-center ">
          <div className="flex justify-center rounded items-center gap-2 mb-3 bg-slate-300 px-4 text-center mx-auto py-2 w-full">
            <input
              type="checkbox"
              id={task._id}
              checked={task.isDone || selectedTasks.includes(task._id)}
              onChange={() => handleCheckboxChange(task._id)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
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
          <Link
            href={`/admin/tasks/edit/${task._id}`}
            className="flex-1 w-full text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Edit Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
