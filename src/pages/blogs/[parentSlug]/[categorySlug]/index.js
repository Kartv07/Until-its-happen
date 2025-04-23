import React from "react";
import { FetchStaticPaths, getBlogsData } from "@/../api.service.js";
import BlogsCard from "@/components/BlogsCard";
import SeoComponent from "@/components/SeoComponent";

export const getStaticPaths = async () => {
  let staticPaths = await FetchStaticPaths(`slug=category`);

  return {
    paths: staticPaths?.data?.paths ?? [],
    fallback: 'blocking'
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
    revalidate : 900, //15 minutes
  };
};

function ParentCategoryPage({ paramsData, blogsData }) {

  return (
    <div>
      <SeoComponent pageTitle={`${paramsData?.parentSlug.toUpperCase()} | ${paramsData?.categorySlug.toUpperCase()} | Until It's Happen`} seo={{}} />
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