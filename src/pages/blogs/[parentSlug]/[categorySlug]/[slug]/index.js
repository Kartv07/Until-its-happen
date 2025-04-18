// pages/blogs/[slug].js
import React from "react";
import { FetchStaticPaths, getBlogsData } from "@/../api.service.js";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  let staticPaths = await FetchStaticPaths(`slug=slug`);

  return {
    paths: staticPaths?.data?.paths ?? [],
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params, req } = context;

  const blogsData = await getBlogsData(`slug=${params?.slug}`);

  return {
    props: {
      paramsData: params,
      blogsData: blogsData?.data ?? [],
    },
    revalidate : 60 * 60 * 24, //24 hours
  };
};

function DetailPage({ paramsData, blogsData}){
  const blogDetails = blogsData;

  const router = useRouter();

  return (
    <div className="m-8 relative p-8 bg-[#141414] border-2 border-[#1d1e24] rounded-lg">
      <div onClick={() => router.back()}>
        <div className="p-2 mb-4 w-fit hover:cursor-pointer hover:border-[#53e1e8] border-2 rounded-lg border-[#1d1e24] ">
          <ChevronLeft size={26} color="#53e1e8" />
        </div>
      </div>
      <h1 className="text-3xl font-extrabold font-mono uppercase bg-gradient-to-r to-white from-[#53e1e8] text-transparent bg-clip-text">
        {blogDetails?.[0]?.heading}
      </h1>
      <div className="mt-8 border-l-4 italic border-[#53e1ed] pl-4 text-lg font-semibold">
        {blogDetails?.[0]?.smallDesc}
      </div>
      <div className="flex justify-end gap-4">
        <div className="px-4 py-2 mt-6 text-end font-semibold bg-gradient-to-r to-white from-[#53e1e8] text-black rounded-lg border-2 border-[#1d1e24] w-fit">
          {blogDetails?.[0]?.categories?.title}
        </div>
        <div className="px-4 py-2 mt-6 text-end font-semibold bg-gradient-to-r to-white from-[#53e1e8] text-black rounded-lg border-2 border-[#1d1e24] w-fit">
          {blogDetails?.[0]?.parentCategories?.title}
        </div>
      </div>
      <div
        className="font-sans font-normal leading-8 tracking-wider text-lg cursor-grab"
        dangerouslySetInnerHTML={{ __html: blogDetails?.[0]?.desc }}
      ></div>
    </div>
  );
}

export default DetailPage;

DetailPage.layout = "ContentLayout";
