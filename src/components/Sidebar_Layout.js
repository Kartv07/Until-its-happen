import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSidebarItems } from "../../api.service";
import {
  House,
  SquareTerminal,
  Cog,
  CircleChevronRight,
  GitMerge,
  CircleChevronDown,
  Linkedin,
  Youtube,
  FolderTree,
  ListTree,
  CircleX,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Sidebar({ sidebarItems }) {
  const [menuItems, setMenuItems] = useState([
    { title: "Dashboard", slug: "dashboard", icon: <House color="#53e1e8" /> },
    { title: "Youtube", slug: "youtube", icon: <Youtube color="#53e1e8" /> },
  ]);

  useEffect(() => {
    setMenuItems([...menuItems, ...sidebarItems]);
  }, [sidebarItems]);

  const [currSlug, setCurrSlug] = useState(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const router = useRouter();

  const pathName = router.pathname;

  return (
    <div>
      <div className="md:hidden px-12 fixed left-0 top-0 border-b-2 border-[#1d1e24] h-14 w-full bg-[#141414] flex justify-between items-center">
        {isMobileOpen ? (
          <CircleX
            size={30}
            className="hover:cursor-pointer hover:text-[#53e1e8]"
            onClick={() => setIsMobileOpen(false)}
          />
        ) : (
          <ListTree
            size={30}
            className="hover:cursor-pointer hover:text-[#53e1e8]"
            onClick={() => setIsMobileOpen(true)}
          />
        )}
      </div>
      <div
        className={`md:block mt-14 md:mt-0 ${
          isMobileOpen ? "block h-screen" : "hidden"
        }`}
      >
        <div className="w-64 h-[94vh] md:h-screen py-4 bg-[#141414] flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center justify-center border-b-2 py-4 w-full border-[#1d1e24]">
              <div
                onClick={() => {
                  setCurrSlug(null);
                  setIsMobileOpen(false);
                  router.push("/");
                }}
                className="relative w-16 h-16 cursor-pointer"
              >
                <Image
                  src="https://res.cloudinary.com/dbqfsf3wi/image/upload/v1742291097/logo_tnnclr.png"
                  alt="Until Its Happen"
                  fill
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="text-lg mt-2 font-semibold">
                Until It's Happen
              </div>
            </div>
            <div className="my-4 w-full px-4">
              {menuItems?.map((item, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      item?.categories?.length > 0
                        ? setCurrSlug(
                            item?.slug == currSlug ? null : item?.slug
                          )
                        : setCurrSlug(item?.slug);

                      setIsMobileOpen(false);

                      !item?.categories
                        ? router.push(`/${item?.slug}`)
                        : router.push(`/blogs/${item?.slug}`);
                    }}
                    className={`flex px-4 my-2 items-center justify-between gap-2 py-3 rounded-lg hover:bg-[#1d1e24] hover:cursor-pointer border-[1px] border-[#141414] ${
                      pathName?.includes(item?.slug)
                        ? "bg-[#1d1e24] border-[1px] !border-[#53e1e8]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item?.slug == "dsa" ? (
                        <SquareTerminal color="#53e1e8" />
                      ) : item?.slug == "system-design" ? (
                        <Cog color="#53e1e8" />
                      ) : item?.icon ? (
                        <div>{item?.icon}</div>
                      ) : (
                        <FolderTree color="#53e1e8" />
                      )}
                      <div className="font-semibold bg-gradient-to-r to-white from-[#53e1e8] text-transparent bg-clip-text">
                        {item?.title}
                      </div>
                    </div>
                    {item?.categories &&
                      (currSlug == item?.slug ||
                      pathName?.includes(`/${item?.slug}`) ? (
                        <CircleChevronDown color="#fbda74" size={20} />
                      ) : (
                        <CircleChevronRight size={20} />
                      ))}
                  </div>

                  {item?.categories &&
                    (currSlug == item?.slug ||
                      pathName?.includes(`/${item?.slug}`)) && (
                      <div className="h-[30%] overflow-y-scroll scrollbar-hide">
                        {item?.categories?.map((category, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setIsMobileOpen(false);
                              router?.push(
                                `/blogs/${item?.slug}/${category?.slug}`
                              );
                            }}
                            className={`hover:bg-[#1d1e24] hover:cursor-pointer px-4 p-2 my-3 rounded-lg mx-6 ${
                              pathName.includes(`/${category?.slug}`)
                                ? "bg-[#1d1e24]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <GitMerge color="#fbda74" size={20} />
                              <div className="text-md font-semibold bg-gradient-to-r to-[#e95a18] from-[#fbda74] text-transparent bg-clip-text">
                                {category?.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {menuItems?.length <= 2 ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <p className="w-full flex flex-col items-center justify-center mx-auto mt-8">
                    <Skeleton count={5} width={220} height={12} />
                  </p>
                </SkeletonTheme>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center border-t-2 border-[#1d1e24] pt-8 py-4">
            <Link
              target="_blank"
              href="https://www.youtube.com/channel/UCa9kY-jziPbIzJjDE7cc5JQ"
              className="p-2 w-fit rounded-lg bg-gradient-to-b from-[#282b33] to-[#2e3139] hover:scale-110 hover:cursor-pointer transform transition"
            >
              <Youtube color="#53e1e8" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/kartavya-panthi/"
              target="_blank"
              className="p-2 w-fit rounded-lg bg-gradient-to-b from-[#282b33] to-[#2e3139] hover:scale-110 hover:cursor-pointer transform transition"
            >
              <Linkedin color="#53e1e8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
