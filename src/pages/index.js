import React from "react";
import { useRouter } from "next/router";
import SeoComponent from "@/components/SeoComponent";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <SeoComponent
        pageTitle="Until Its Happen"
        seo={{
          desc: "One Stop Solution for all your DSA, System Design, and Software Development needs.",
          keywords: "DSA, System Design, Software Development, Coding, Tutorials, Articles, Videos"
        }}
      />
      <div className="bg-[#141414] min-h-screen mx-auto flex flex-col justify-center items-center">
        <div className="bg-gradient-to-r flex justify-center items-center from-purple-500 to-[#53e1e8] w-16 h-16 rounded-lg">
          <span className="text-white font-bold text-xl">&lt;/&gt;</span>
        </div>

        <div className="mt-6 text-center">
          <span className="bg-clip-text text-6xl leading-18 text-center font-extrabold text-transparent font-serif bg-gradient-to-r from-purple-400 via-[#53e1e8] to-red-500">
            Level Up Your Coding Journey
          </span>
        </div>

        <div className="mt-8 text-xl text-center px-8 md:max-w-2/3 md:px-0">
          Revised Content on DSA, System Design, and Software Development with
          practical tutorials, in-depth articles, and engaging video content.
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <div
              onClick={() => router.push("/dashboard")}
              className="px-6 py-4 cursor-pointer border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-110"
            >
              Explore Content
            </div>
          </div>
          <div className="ml-4 flex items-center justify-center rounded-md shadow">
            <a
              href="https://www.youtube.com/channel/UCa9kY-jziPbIzJjDE7cc5JQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-2 py-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                className="h-6 w-6 mr-2 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

LandingPage.layout = "ContentLayout";
