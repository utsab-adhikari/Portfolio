"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NewsGrid from "./NewsGrid";
import { usePathname } from "next/navigation";
import NewsNavbar from "./NewsNavbar";

type NewsType = {
  headline?: string;
  source?: string;
  slug?: string;
  image?: string;
  link?: string;
  message?: string;
};

const News = () => {
  const pathname = usePathname();
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
      } catch (error: any) {
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
      <NewsNavbar pathname={pathname} />
      {/* <div className="flex items-center justify-between p-5 gap-5">
        <Link href={`/news/ekantipur`} className="mt-auto">
          <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
            eKantipur
          </Button>
        </Link>
        <Link href={`/news/saved`} className="mt-auto">
          <Button className="w-full bg-green-700 hover:bg-green-600 text-white">
            Saved
          </Button>
        </Link>
        <Link href={`/news/ktmpost`} className="mt-auto">
          <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">
            KTM Post
          </Button>
        </Link>
      </div> */}
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl text-gray-400 flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
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
