"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type NewsType = {
  headline?: string;
  source?: string;
  slug?: string;
  image?: string;
  link?: string;
  message?: string;
};

const NewsGrid = ({
  posts,
  buttonLabel,
}: {
  posts: NewsType[];
  buttonLabel: string;
}) => {
  const [isSaveLoading, setIsSaveLoading] = useState<string | null>(null);

  const saveNews = async (news: NewsType) => {
    const id = news.slug ?? news.link;
    setIsSaveLoading(id);

    const toastId = toast.loading("Saving News...");
    try {
      const response = await axios.post(
        "/api/v1/news/u/save",
        {
          headline: news.headline,
          slug: news.slug,
          link: news.link,
          source: news.source,
          image: news.image,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message, { id: toastId });
    } catch (error: any) {
      console.error("Error while saving news:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSaveLoading(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 max-w-7xl mx-auto">
        {posts.map(
          (news) =>
            news.headline &&
            news.link &&
            news.image && (
              <div
                key={news.slug ?? news.link}
                className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <div className="flex justify-end">
                  {isSaveLoading === (news.slug ?? news.link) ? (
                    <button
                      disabled
                      className="absolute font-bold animate-spin text-red-600 cursor-not-allowed m-2"
                    >
                      <AiOutlineLoading3Quarters size={24} />
                    </button>
                  ) : (
                    <button
                      onClick={() => saveNews(news)}
                      className="absolute font-bold text-gray-700 hover:text-green-800 cursor-pointer m-2"
                    >
                      <MdSaveAlt size={24} />
                    </button>
                  )}
                </div>

                {/* Image */}
                <img
                  src={news.image}
                  alt="News Image"
                  className="w-full h-48 object-cover"
                />

                {/* Source Badge */}
                <div className="absolute p-1 bg-indigo-800 w-fit pr-5 rounded-r-full">
                  <h3 className="text-sm font-semibold text-white">
                    {news.source}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-full">
                  <h2
                    style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                    }}
                    className="text-xl font-semibold text-gray-800 mb-2"
                  >
                    {news.headline}
                  </h2>

                  {news.slug && (
                    <p
                      style={{
                        fontFamily: "'Noto Sans Devanagari', sans-serif",
                      }}
                      className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-4"
                    >
                      {news.slug}
                    </p>
                  )}

                  <Link href={news.link} target="_blank" className="mt-auto">
                    <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
                      {buttonLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
