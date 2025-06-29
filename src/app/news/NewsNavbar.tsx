import Link from "next/link";
import React from "react";

interface NewsNavbarProps {
  pathname: string;
}

const NewsNavbar: React.FC<NewsNavbarProps> = ({ pathname }) => {
  const linkStyle = (href: string) =>
    pathname === href
      ? "border-2 border-indigo-600 rounded-xl text-indigo-600 px-3 py-2"
      : "px-3 py-2";

  return (
    <div className="z-100 font-semibold flex justify-evenly items-center  rounded-xl m-2">
      <Link className={linkStyle("/news")} href="/news">
        Latest
      </Link>
      <Link className={linkStyle("/news/saved")} href="/news/saved">
        Saved
      </Link>
      <Link className={linkStyle("/news/ekantipur")} href="/news/ekantipur">
        eKantipur
      </Link>
      <Link className={linkStyle("/news/ktmpost")} href="/news/ktmpost">
        The KTM Post
      </Link>
    </div>
  );
};

export default NewsNavbar;
