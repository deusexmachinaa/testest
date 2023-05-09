"use client"
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import testest_black from "/public/testest_black.png";
import testest_white from "/public/testest_white.png";
import logoDarkMode from "/public/logoDarkMode.png";
import logoLightMode from "/public/logoLightMode.png";
import Image from "next/image";
import { MenuItems } from "@/Data/MainMenu";
import Menu from "./Menu";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "next-themes";

function MainMenuName() {
    const menuItemsList = useMemo(() => {
      return MenuItems.map((item, index) => (
        <li key={index}>
          <Link
            key={index}
            href={item.href}
            className="text-gray-800 dark:text-white hover:text-blue-500"
          >
            {item.title}
          </Link>
        </li>
      ));
    }, []); // Empty dependency array to execute the mapping logic once
  
    return <ul className="flex items-center space-x-4">{menuItemsList}</ul>;
  }

  export interface NavProps {
    title : string;
  }



export default function Navigation({ title }:NavProps) {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [onToggle, setOnToggle] = useState<boolean>(false);
  const { theme, setTheme } = useTheme()


  
  // 테마를 전환하기 위해 사용했다.
  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // 사용자 로컬 스토리지에 저장하고 태마 변경시마다 body의 class를 바꿔준다.
    window.localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  useEffect(() => {
    // 로컬 스토리지에서 테마 설정을 불러옵니다.
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      // 저장된 테마가 있다면, 상태와 body의 className을 업데이트합니다.
      setTheme(storedTheme);
      document.body.className = storedTheme;
    } else {
      // 저장된 테마가 없다면, 기본 테마를 사용합니다.
      setTheme("light");
      document.body.className = "light";
      window.localStorage.setItem("theme", "light");
    }
  }, []);

  // 스크롤이 내려가면 헤더 하단에 그림자 속성을 주기 위해서 사용했다.
  const handleScroll = () => {
    if (window.scrollY > 0) {
      headerRef.current?.classList.add("shadow-[0_5px_7px_0px_#ececec]");
      return;
    }
    headerRef.current?.classList.remove("shadow-[0_5px_7px_0px_#ececec]");
  };

  // 모달을 켜고 끄기 위해서 사용했다.
  const handleToggle = () => {
    if (onToggle) toggleRef.current?.classList.add("hidden");
    else toggleRef.current?.classList.remove("hidden");
    setOnToggle((prev) => !prev);
  };

  // 스크롤 이벤트와 테마를 적용하는 코드를 넣어준다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setTheme(document.body.className);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return (
        <>
      <header className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto pr-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
  <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start">
            <Link href="/">
            {theme === "dark" ? (
              <Image
                src={testest_white}
                alt="profile"
                width={180}
                height={30}
              />
            ) : (
              <Image
                src={testest_black}
                alt="profile"
                width={180}
                height={30}
              />
            )}
          </Link>
            </div>
            <div className="w-full md:w-1/3 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            <Link href={"/testest"}>{title}</Link>
          </h2>
            </div>
          <div className="w-full md:w-1/3 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end">
            <button type="button" className="m-0 p-0 mb-2 mr-2 fixed top-4 right-4" onClick={handleTheme}>
              {theme === "dark" ? (
                <Image
                  src={logoDarkMode}
                  alt="dark mode"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src={logoLightMode}
                  alt="light mode"
                  width={30}
                  height={30}
                />
              )}
            </button>
              <button
              type="button"
              className="m-0 p-0 mb-2 mr-2 sm:hidden"
              onClick={handleToggle}
            >
            </button>
            <div className="flex-nowrap items-center justify-center gap-5 text-center hidden sm:flex">
              <Menu type="normal" />
            </div>
            </div>
          </div>
        </div>
      </header>
        </>
    );
  }