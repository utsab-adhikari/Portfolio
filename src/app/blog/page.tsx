"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Link from "next/link";

interface ApiResponse {
  message: string;
  success?: boolean;
  blogs?: any;
}

// types.ts or top of component
export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  author: string;
  image: string;
  createdAt: string;
}

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const toastId = toast.loading("Fetching Blogs...");
    setIsLoading(true);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `/api/v1/blog`,
          { withCredentials: true }
        );
        setBlogs(response.data.blogs);
        if (response.data.success) {
          toast.success(response.data.message, { id: toastId });
        } else {
          toast.error(response.data.message, { id: toastId });
        }
      } catch (err: any) {
        toast.error("Failed to Load Blogs!", { id: toastId });
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p className="min-h-[70vh] mx-auto my-auto flex items-center justify-center text-3xl text-gray-300 text-bold">Loading...</p>
      ) : (
        <div>
          {Array.isArray(blogs) ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src="/images/image02.jpg"
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 truncate">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      by{" "}
                      <span className="font-semibold text-gray-700">
                        {blog.author}
                      </span>{" "}
                      · {format(new Date(blog.createdAt), "dd MMM yyyy")}
                    </p>

                    <div className="pt-3">
                      <Link
                        href={`/blog/details/${blog._id}`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                      >
                        View Blog
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center text-center justify-center p-5 my-auto min-h-[70vh]">
              <p className="text-xl font-bold text-gray-400">
                Latest Blogs Not Found !
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
