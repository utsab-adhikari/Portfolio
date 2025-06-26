"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

type News = {
  headline: string;
  slug: string;
  image?: string;
  link?: string;
};

const KtmPost = () => {
  const [newses, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/news/ktmpost`);
        setNews(response.data.news);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="">
      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-stone-800">📰 ktmpost</h1>
          <p className="text-stone-500 text-sm max-w-xl">
            You can read the latest <strong>news</strong> from{" "}
            <strong>eKantipur</strong> to stay informed.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-2 mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://ekantipur.com" target="_blank">
              <Button>
                eKantipur <IoIosArrowForward size={24} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Visit Official Site</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col space-y-3 justify-center items-center"
            >
              <Skeleton className="h-[150px] w-full max-w-sm rounded-xl" />
              <div className="space-y-2 w-full max-w-sm">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4 max-w-7xl mx-auto">
          {newses.map((news) => (
            <div
              key={news.slug}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {news.image && (
                <img
                  src={news.image}
                  alt="News Image"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-xl font-devanagari font-semibold text-gray-800 mb-2">
                  {news.headline}
                </h2>
                <p className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-4">
                  {news.slug}
                </p>
                {news.link && (
                  <Link href={news.link} target="_blank">
                    <button className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                      Read at ktmpost
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KtmPost;
