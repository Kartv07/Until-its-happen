import React from "react";
import { FetchStaticPaths, getBlogsData } from "@/../api.service.js";
import BlogsCard from "@/components/BlogsCard";

export const getStaticPaths = async () => {
  let staticPaths = await FetchStaticPaths(`slug=category`);

  return {
    paths: staticPaths?.data?.paths ?? [],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let {categorySlug, parentSlug} = await params;

  let blogsData = await getBlogsData(
    `parentCategory=${parentSlug}&category=${categorySlug}`
  );

  return {
    props: {
      paramsData : {categorySlug, parentSlug},
      blogsData : blogsData?.data ?? [],
    },
  };
};

function ParentCategoryPage({ paramsData, blogsData }) {

  return (
    <div>
      <BlogsCard
        linkHref={`/blogs/${paramsData?.parentSlug}/${paramsData?.categorySlug}`}
        paramsData={paramsData}
        blogsData={blogsData || []}
      />
    </div>
  );
}

export default ParentCategoryPage;

ParentCategoryPage.layout = "ContentLayout";