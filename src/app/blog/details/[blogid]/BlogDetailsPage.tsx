"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BlogDetailsProps {
  blogid: string;
}

interface ApiResponse {
  message: string;
  success?: boolean;
  blog: any;
}

export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  author: string;
  image: string;
  createdAt: string;
}



const BlogByCategoryPage = ({ blogid }: BlogDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<BlogType>();
  const [author, setAuthor] = useState<BlogType>();
  const [content, setContent] = useState<BlogType>();


  
  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching Blog...");
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `/api/v1/blog/details/${blogid}`,
          { withCredentials: true }
        );
        setAuthor(response.data.blog.author);
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        if (response.data.success) {
          toast.success(response.data.message, { id: toastId });
        } else {
          toast.error(response.data.message, { id: toastId });
        }
      } catch (err: any) {
        toast.error("Blog Creation Failed!", { id: toastId });
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return <div>

<h1 className="text-xl font-bold">{title}</h1>
<h1 className="text-sm font-semibold">{author}</h1>
<p>{content}</p>

  </div>;
};

export default BlogByCategoryPage;
