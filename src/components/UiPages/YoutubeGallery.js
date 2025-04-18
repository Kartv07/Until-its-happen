import { useState } from "react";
import Image from "next/image";
import { CircleX, Youtube } from "lucide-react";
import Loader from "../Loader";
import YouTubePlayer from "../YoutubePlayer";

export default function YoutubeGallery({ youtubeData }) {
  const [currIdx, setCurrIdx] = useState(null);
  return (
    <div
      className={`${youtubeData.length > 0 ? "p-8" : ""} ${
        youtubeData.length > 2 ? "!justify-center" : ""
      } flex gap-8 items-center flex-wrap justify-center md:justify-start`}
    >
      {!youtubeData || youtubeData?.length == 0 ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {youtubeData?.map((youtube, index) => (
            <div key={index}>
              <div className="flex relative flex-col gap-4 border-6 border-white bg-[#141414] rounded-lg p-4 min-w-[330px] max-w-[330px]">
                <div className="text-xl font-semibold font-mono line-clamp-2 bg-gradient-to-r to-white from-[#53e1e8] text-transparent bg-clip-text">
                  {youtube.title}
                </div>
                <div
                  onClick={() => setCurrIdx(index)}
                  className="w-72 relative h-60 bg-black bg-opacity-50 rounded-xl hover:opacity-70 cursor-pointer"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${youtube.youtubeId}/sddefault.jpg`}
                    alt={youtube.title}
                    fill
                    className="object-contain rounded-xl"
                  />
                  <div className="bg-[#FF0033] absolute left-[42%] top-[50%] p-1 px-2 w-fit rounded-md">
                    <Youtube size={30} />
                  </div>
                </div>
                <div className="text-md font-mono line-clamp-2">
                  {youtube.desc}
                </div>
              </div>

              {/* Modal */}
              {currIdx === index && (
                <div className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
                  <div className="bg-[#141414] rounded-lg p-6 w-[90vw] md:w-fit flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="text-xl font-semibold font-mono max-w-[92%] line-clamp-2 bg-gradient-to-r to-white from-[#53e1e8] text-transparent bg-clip-text">
                        {youtube.title}
                      </div>
                      <div
                        onClick={() => setCurrIdx(null)}
                        className="cursor-pointer"
                      >
                        <CircleX size={30} color="#53e1e8" />
                      </div>
                    </div>
                    <YouTubePlayer videoId={youtube.youtubeId} />
                    {/* <div className="text-md font-sans font-normal leading-6 max-w-[720px]">
                      {youtube.desc}
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
