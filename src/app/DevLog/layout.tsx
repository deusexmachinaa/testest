import { ReactNode } from "react"
import DevLogHeader from "../../components/DevLogHeader"
import DevLogFooter from "../../components/DevLogFooter"
import { GetStaticProps } from "next";
import { allPosts } from "contentlayer/generated";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

// 초기 테마 모드 설정
function setInitialColorMode() {
  // 내부에 저장되어 있는 값 혹은 mediaQuery의 값을 찾아서 적용해준다.
  function getInitialColorMode() {
    const preference = window.localStorage.getItem("theme");
    const hasExplicitPreference = typeof preference === "string";

    if (hasExplicitPreference) {
      return preference;
    }

    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasImplicitPreference = typeof mql.matches === "boolean";
    if (hasImplicitPreference) {
      return mql.matches ? "dark" : "light";
    }

    return "dark";
  }
  const colorMode = getInitialColorMode();
  document.body.className = colorMode;
}

const blockingSetInitialColorMode = `(function() {
      ${setInitialColorMode.toString()}
      setInitialColorMode();
  })()
  `;


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DevLogHeader />
      <main className="transition duration-500 bg-white dark:bg-[#111111] text-black dark:text-white">
        <div className="max-w-screen-md flex flex-col px-10 m-auto">
          {children}
        </div>
      </main>
      <DevLogFooter />
    </>
  );
}
