import React from "react";
import YoutubeGallery from "@/components/UiPages/YoutubeGallery";
import { FetchYoutubeDataRequest } from "../../../api.service";
import SeoComponent from "@/components/SeoComponent";

export const getStaticProps = async () => {
  let youtubeData = await FetchYoutubeDataRequest();

  return {
    props: {
      youtubeData: youtubeData?.data ?? [],
    },
    revalidate: 900, //15 minutes
  };
};

export default function YoutubeStaticPage({ youtubeData }) {
  return (
    <>
      <SeoComponent
        pageTitle="YouTube Gallery | Until It's Happen"
        seo={{
          desc: "Explore detailed tutorials on DSA, System Design, and Software Development with hands-on examples and real-world insights.",
          keywords:
            "DSA, System Design, Software Development, Coding, Tutorials, Articles, Videos",
        }}
      />
      <YoutubeGallery youtubeData={youtubeData} />
    </>
  );
}

YoutubeStaticPage.layout = "ContentLayout";
