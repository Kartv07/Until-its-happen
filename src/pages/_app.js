import "@/styles/globals.css";
import ContentLayout from "@/components/ContentLayout.js";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Cedarville_Cursive,
} from "next/font/google";

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
  const Layout =
    layouts[Component.layout] ||
    ((props) => <Component {...props} />);

  return (
    <div
      className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} ${cursive.variable} antialiased flex text-white bg-black`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
