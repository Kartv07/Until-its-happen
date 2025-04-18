import React from "react";
import Sidebar from "./Sidebar_Layout.js";

export default function ContentLayout({children, sidebarItems}) {
  return (
    <div className="flex text-white bg-black min-w-screen min-h-screen">
      <div className="h-full z-[10] fixed left-0 top-0 border-r-2 border-[#1d1e24]">
        <Sidebar sidebarItems={sidebarItems} />
      </div>

      <div className="flex-grow min-h-[100vh] h-full overflow-y-auto md:ml-64 mt-14 md:mt-0">
        {children}
      </div>
    </div>
  );
}
