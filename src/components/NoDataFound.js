import React from "react";
import Image from "next/image";

function NoDataFound() {
  return (
    <div className="flex justify-center items-center md:-ml-24 min-h-screen min-w-screen">
      <div className="relative w-80 h-80 max-w-full max-h-full rounded-lg">
        <Image
          src="https://res.cloudinary.com/dbqfsf3wi/image/upload/v1742291429/page-not-found_qzurvx.png"
          alt="No Result !"
          fill
          className="rounded-2xl object-cover"
          quality={100}
        />
      </div>
    </div>
  );
}

export default NoDataFound;
