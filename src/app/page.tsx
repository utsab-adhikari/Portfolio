import { AppSidebar } from "@/mycomponents/AppSidebar";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-700 leading-tight mb-6">
            Hi, I'm Utsab 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            A passionate IT student from Nepal 🇳🇵{" "}
            <br className="hidden sm:block" />
            specializing in backend development. I focus on real-world
            applications involving RESTful APIs, authentication, and database
            management.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center gap-4">
            <Link
              href={`/hireme`}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-lg shadow-md transition duration-300"
            >
              🚀 Hire Me
            </Link>
            <button
              className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white text-base font-semibold rounded-lg shadow-md transition duration-300"
              // onClick={() => setShowCreateModal(true)}
            >
              🎯 Let's Create
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://github.com/shadcn.png"
            alt="Utsab's Profile"
            className="w-72 h-72 rounded-full object-cover border-4 border-indigo-300 shadow-xl transition duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
