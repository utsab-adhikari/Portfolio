"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface ApiResponse {
  message: string;
  success?: boolean;
}

export default function CreateBlog() {
  const router = useRouter();

  // Separate state hooks for each field
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [content, setContent] = useState("");
  const [reference, setReference] = useState("");
  const [topic, setTopic] = useState("");
  const [partNo, setPartNo] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Publishing...");

    const formData = {
      title,
      slug,
      author,
      category,
      image,
      badge,
      content,
      reference,
      topic,
      partno: partNo,
    };

    try {
      const response = await axios.post<ApiResponse>(
        "/api/v1/blog/create",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        router.push("/");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Blog Creation Failed!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Create New Blog Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="The Art of Next.js"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="the-art-of-nextjs"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder="Jane Doe"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="sm:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Featured Image URL
            </label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Badge */}
          <div>
            <label htmlFor="badge" className="block text-sm font-medium mb-1">
              Badge
            </label>
            <input
              id="badge"
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Featured"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Reference URL */}
          <div>
            <label
              htmlFor="reference"
              className="block text-sm font-medium mb-1"
            >
              Reference URL <span className="text-red-500">*</span>
            </label>
            <input
              id="reference"
              type="url"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
              placeholder="https://source.com/article"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-1">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="React, Next.js, etc."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Part Number */}
          <div>
            <label htmlFor="partNo" className="block text-sm font-medium mb-1">
              Part Number
            </label>
            <input
              id="partNo"
              type="number"
              value={partNo}
              onChange={(e) =>
                setPartNo(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="1"
              min={1}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <label htmlFor="content" className="block mb-2 font-medium">
            Content <span className="text-red-500">*</span>
          </label>
          <JoditEditor
            id="content"
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            config={{ height: 400 }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold rounded-md transition 
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            }`}
        >
          {isLoading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
