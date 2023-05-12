"use client"
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import testest_black from "/public/testest_black.png";
import testest_white from "/public/testest_white.png";
import logoDarkMode from "/public/logoDarkMode_white.png";
import logoLightMode from "/public/logoLightMode.png";
import Image from "next/image";
import {MenuItemsEmergency } from "@/Data/MainMenu";
import Menu from "./NavMenu";
import { useTheme } from "next-themes";
import { supabase } from "@/supabaseClient";

function MainMenuName() {
    const menuItemsList = useMemo(async() => {
      const { data:MenuItems } = await supabase.from('MenuItems').select()
      console.log(MenuItems)
      return (MenuItems ?? MenuItemsEmergency).map((item, index) => (
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
    href : string;
  }



export default function Navigation({ title,href }:NavProps) {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [onToggle, setOnToggle] = useState<boolean>(false);
  const { theme, setTheme } = useTheme()
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);


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

  // 스크롤이 내려가면 헤더 하단에 그림자 속성 + nav 숨기기
  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop < lastScrollTop) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    } 
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  
  // 스크롤 이벤트와 테마를 적용하는 코드를 넣어준다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setTheme(document.body.className);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // 모달을 켜고 끄기 위해서 사용했다.
  const handleToggle = () => {
    if (onToggle) toggleRef.current?.classList.add("hidden");
    else toggleRef.current?.classList.remove("hidden");
    setOnToggle((prev) => !prev);
  };

    return (
        <>
        <header
    ref={headerRef}
    className={`sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg dark:bg-gray-800/75 dark:border-gray-700 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
      {/* your existing code... */}
        <div className="containerpr-6 pt-4 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
  <div className="w-full md:w-1/3 flex items-center justify-between  md:justify-start">
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
          <div className="justify-between flex mr-4">
            <div className="mr-4 mt-1">
          <button type="button" onClick={handleTheme}>
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
                    </div>
          <button
              type="button"
              className="m-0 p-0 sm:hidden"
              onClick={handleToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 transition duration-500 stroke-black dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
            </div>
            
            <div className="w-full md:w-1/3 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white max-md:hidden">
            <Link href={href}>{title}</Link>
          </h2>
            </div>
          <div className="w-full md:w-1/3 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end mt-2 pb-2">
            <div className="flex-nowrap items-center justify-center gap-5 text-center hidden sm:flex mr-4">
              <Menu type="normal" />
            </div>
            </div>
          </div>
        </div>
      </header>
      <div
          ref={toggleRef}
          className="w-full h-screen absolute top-20 left-0 z-50 bg-gray-200 flex-col flex-nowrap p-5 flex hidden dark:bg-[#111111]"
        >
          <Menu type="toggle" onClick={handleToggle} />
        </div>
        </>
    );
  }