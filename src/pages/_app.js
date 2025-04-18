import "@/styles/globals.css";
import ContentLayout from "@/components/ContentLayout.js";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Cedarville_Cursive,
} from "next/font/google";
import { getSidebarItems } from "../../api.service";
import { useState, useEffect } from "react";

const layouts = {
  ContentLayout: ContentLayout,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const cursive = Cedarville_Cursive({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  const [sidebarItems, setSidebarItems] = useState([]);

  const sidebarItemsHandler = async () => {
    let res = await getSidebarItems();
    setSidebarItems(res?.data || []);
  };

  useEffect(() => {
    sidebarItemsHandler();
  }, []);

  const Layout = layouts[Component.layout] || (({ children }) => <>{children}</>);

  return (
    <div
      className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} ${cursive.variable} antialiased flex text-white bg-black`}
    >
      <Layout sidebarItems={sidebarItems}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

