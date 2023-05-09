import Link from "next/link";
import "./globals.css";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
import { allPosts } from "contentlayer/generated";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html>
      <body>
        <div className="flex flex-col min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
