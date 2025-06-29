"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import NewsNavbar from "../NewsNavbar";

type News = {
  headline: string;
  slug: string;
  image?: string;
  source?: string;
  link?: string;
  _id?: string;
};

const KtmPost = () => {
  const pathname = usePathname();
  const [newses, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");
    const getNews = async () => {
      try {
        const response = await axios.get(`/api/v1/news/u/get`);
        setNews(response.data.news);
        console.log(response.data.news);
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

  const handleDelete = async (newsid: any) => {
    setIsDeleteLoading(newsid);

    const toastId = toast.loading("Deleting News...");
    try {
      const response = await axios.get(`/api/v1/news/u/delete/${newsid}`, {
        withCredentials: true,
      });

      toast.success(response.data.message, { id: toastId });
    } catch (error: any) {
      console.error("Error while Deleting news:", error);
      toast.error(error.message, { id: toastId });
    } finally {
      setIsDeleteLoading(null);
      setIsDeleted(newsid);
    }
  };

  return (
    <div className="">
      <NewsNavbar pathname={pathname} />
      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-indigo-800">Saved News</h1>
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
        <>
          {newses.map((news) => (
            <div
              key={news.slug}
              className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4 max-w-7xl mx-auto"
            >
              {news.headline && news.slug && news.image && (
                <>
                  {isDeleted === news._id ? (
                    <></>
                  ) : (
                    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="flex justify-end">
                        {isDeleteLoading === news._id ? (
                          <button
                            disabled
                            className="absolute font-bold animate-spin text-red-600 cursor-not-allowed m-2"
                          >
                            <AiOutlineLoading3Quarters size={24} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(news._id)}
                            className="absolute font-bold text-red-700 hover:text-red-400 cursor-pointer m-2"
                          >
                            <FaRegTrashAlt size={20} />
                          </button>
                        )}
                      </div>
                      {news.image && (
                        <img
                          src={news.image}
                          alt="News Image"
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="absolute p-1 bg-indigo-800 w-fit pr-5 rounded-r-full">
                        <h3 className="text-sm font-semibold text-white">
                          {news.source}
                        </h3>
                      </div>
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
                              Read at{" "}
                              {news.source === "ekantipur"
                                ? "eKantipur"
                                : "The Kathmandu Post"}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default KtmPost;
