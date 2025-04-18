import React from 'react'
import YoutubeGallery from '@/components/UiPages/YoutubeGallery';
import { FetchYoutubeDataRequest } from '../../../api.service';

export const getStaticProps = async () => {
  let youtubeData = await FetchYoutubeDataRequest();

  return {
    props: {
      youtubeData : youtubeData?.data ?? [],
    },
    revalidate: 900, //15 minutes
  };
};

export default function YoutubeStaticPage({youtubeData}) {

  return (
    <YoutubeGallery youtubeData={youtubeData}/>
  )
}

YoutubeStaticPage.layout = "ContentLayout";
