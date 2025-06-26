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

type NewsType = {
  headline: string;
  slug?: string;
  image?: string;
  link?: string;
};

const News = () => {
  const [ktmPosts, setKtmPosts] = useState<NewsType[]>([]);
  const [ekantipurPosts, setEkantipurPosts] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const [ktm, ekantipur,] = await Promise.all([
          axios.get(`/api/v1/news/ktmpost`),
          axios.get(`/api/v1/news/ekantipur`)
        ]);

        setKtmPosts(ktm.data.news.slice(0, 3));
        setEkantipurPosts(ekantipur.data.news.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="">
      <div className="w-full py-6 px-4">
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight">
            📰 Explore Latest News
          </h1>
          <p className="text-stone-600 text-base sm:text-lg">
            Choose your preferred{" "}
            <strong className="text-stone-800 font-semibold">news source</strong>{" "}
            and <strong className="text-stone-800 font-semibold">category</strong> to stay informed with the latest headlines.
          </p>
        </div>
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
        <>
          {/* Kathmandu Post */}
          <SectionHeader title="The Kathmandu Post" link="/kathmandupost" tooltip="Go to The Kathmandu Post" />
          <NewsGrid posts={ktmPosts} buttonLabel="Read at The Kathmandu Post" />

          {/* eKantipur */}
          <SectionHeader title="eKantipur" link="/ekantipur" tooltip="Go to eKantipur" />
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
);

