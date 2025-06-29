"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewsGrid from "../NewsGrid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NewsNavbar from "../NewsNavbar";
import { usePathname } from "next/navigation";

type News = {
  headline: string;
  slug: string;
  image?: string;
  link?: string;
};

const EkantipurPage = () => {
  const pathname = usePathname();
  const [newses, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");
    const getNews = async () => {
      try {
        const response = await axios.get(`/api/v1/news/ekantipur`);
        setNews(response.data.news);
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error: any) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="">
      <NewsNavbar pathname={pathname} />

      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-indigo-800">eKantipur</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl text-gray-400 flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : (
        <NewsGrid posts={newses} buttonLabel="Read at eKantipur" />
      )}

      {/* {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <p className="h-screen text-center mx-auto my-auto flex items-center justify-center text-3xl text-gray-300 text-bold">
            Loading...
          </p>
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
                <h2
                  style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                  }}
                  className="text-xl font-devanagari font-semibold text-gray-800 mb-2"
                >
                  {news.headline}
                </h2>
                <p
                  style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                  }}
                  className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-4"
                >
                  {news.slug}
                </p>
                {news.link && (
                  <Link href={news.link} target="_blank">
                    <button className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                      Read at eKantipur
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default EkantipurPage;
