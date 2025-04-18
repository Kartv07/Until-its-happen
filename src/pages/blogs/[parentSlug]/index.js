import BlogsCard from "@/components/BlogsCard";
import { FetchStaticPaths, getBlogsData } from "@/../api.service.js";
import SeoComponent from "@/components/SeoComponent";

export const getStaticPaths = async () => {
  let staticPaths = await FetchStaticPaths(`slug=parentCategory`);

  return {
    paths: staticPaths?.data?.paths ?? [],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let { parentSlug } = params;

  const blogsData = await getBlogsData(`parentCategory=${parentSlug}`);

  return {
    props: {
      parentSlug,
      blogsData: blogsData?.data ?? [],
    },
    revalidate: 900,
  };
};

export default function BlogsDesc({ parentSlug, blogsData }) {
  return (
    <>
      <SeoComponent pageTitle={`${parentSlug.toUpperCase()} | Until It's Happen`} seo={{}} />
      <BlogsCard
        linkHref={`${parentSlug}`}
        parentPage={true}
        blogsData={blogsData}
      />
    </>
  );
}

BlogsDesc.layout = "ContentLayout";
