"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

type NewsType = {
  headline: string;
  source?: string;
  slug?: string;
  image?: string;
  link?: string;
};

const News = () => {
  const [ktmPosts, setKtmPosts] = useState<NewsType[]>([]);
  const [ekantipurPosts, setEkantipurPosts] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");

    const getNews = async () => {
      try {
        const [ktm, ekantipur] = await Promise.all([
          axios.get(`/api/v1/news/ktmpost`),
          axios.get(`/api/v1/news/ekantipur`),
        ]);

        setKtmPosts(ktm.data.news.slice(0, 3));
        setEkantipurPosts(ekantipur.data.news.slice(0, 3));
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error:any) {
        console.error("Error fetching news:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between p-5 gap-5">
        <Link href={`/news/ekantipur`} className="mt-auto">
          <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
            eKantipur
          </Button>
        </Link>
        <Link href={`/news/ktmpost`} className="mt-auto">
          <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
            KTM Post
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <p className="h-screen text-center mx-auto my-auto flex items-center justify-center text-3xl text-gray-300 text-bold">
            Loading...
          </p>
        </div>
      ) : (
        <>
          <NewsGrid posts={ktmPosts} buttonLabel="Read at The Kathmandu Post" />
          <NewsGrid posts={ekantipurPosts} buttonLabel="Read at eKantipur" />
        </>
      )}
    </div>
  );
};

export default News;

const SectionHeader = ({
  title,
  link,
  tooltip,
}: {
  title: string;
  link: string;
  tooltip: string;
}) => (
  <div className="w-full flex items-center justify-between bg-stone-900 px-4 py-2 rounded-md shadow-sm">
    <h2 className="text-base font-semibold text-gray-200 tracking-wide">
      {title}
    </h2>

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          className="text-gray-200 hover:text-white transition-colors duration-200"
          aria-label={tooltip}
        >
          <IoIosArrowForward size={22} />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </div>
);

const NewsGrid = ({
  posts,
  buttonLabel,
}: {
  posts: NewsType[];
  buttonLabel: string;
}) => (
  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 max-w-7xl mx-auto">
      {posts.map(
        (news) =>
          news.headline &&
          news.link &&
          news.image && (
            <div
              key={news.slug ?? news.link}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={news.image}
                alt="News Image"
                className="w-full h-48 object-cover"
              />
              <div className="absolute p-1 bg-indigo-800 w-fit pr-5 rounded-r-full">
                <h3 className="text-sm font-semibold text-white">
                  {news.source}
                </h3>
              </div>
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
