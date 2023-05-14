'use client';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Nav from './DevLogNav';
import logoDarkMode from '/public/logoDarkMode_white.png';
import logoLightMode from '/public/logoLightMode.png';
import testest_black from '/public/testest_black.png';
import testest_white from '/public/testest_white.png';
import { useTheme } from 'next-themes';

export default function DevLogHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [onToggle, setOnToggle] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // 테마를 전환하기 위해 사용했다.
  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // 사용자 로컬 스토리지에 저장하고 태마 변경시마다 body의 class를 바꿔준다.
    window.localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  useEffect(() => {
    // 로컬 스토리지에서 테마 설정을 불러옵니다.
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme) {
      // 저장된 테마가 있다면, 상태와 body의 className을 업데이트합니다.
      setTheme(storedTheme);
      document.body.className = storedTheme;
    } else {
      // 저장된 테마가 없다면, 기본 테마를 사용합니다.
      setTheme('light');
      document.body.className = 'light';
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  // 스크롤이 내려가면 헤더 하단에 그림자 속성을 주기 위해서 사용했다.
  const handleScroll = () => {
    if (window.scrollY > 0) {
      headerRef.current?.classList.add('shadow-[0_5px_7px_0px_#ececec]');
      return;
    }
    headerRef.current?.classList.remove('shadow-[0_5px_7px_0px_#ececec]');
  };

  // 모달을 켜고 끄기 위해서 사용했다.
  const handleToggle = () => {
    if (onToggle) toggleRef.current?.classList.add('hidden');
    else toggleRef.current?.classList.remove('hidden');
    setOnToggle((prev) => !prev);
  };

  // 스크롤 이벤트와 테마를 적용하는 코드를 넣어준다.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setTheme(document.body.className);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스타일은 자유 변경이 가능하다.
  return (
    <>
      <Head>
        <title>TesTesT</title>
      </Head>
      <header
        ref={headerRef}
        className="top-0 left-0 w-full z-10 h-20 font-mono transition duration-500 bg-white dark:bg-[#111111]"
      >
        <div className="text-black max-w-screen-md h-20 flex flex-nowrap items-center justify-between m-auto px-8">
          <Link href="/">
            {theme === 'dark' ? (
              <Image src={testest_white} alt="profile" width={180} height={30} />
            ) : (
              <Image src={testest_black} alt="profile" width={180} height={30} />
            )}
          </Link>
          <div className="flex flex-nowrap gap-8 items-center">
            <button type="button" className="m-0 p-0" onClick={handleTheme}>
              {theme === 'dark' ? (
                <Image src={logoDarkMode} alt="dark mode" width={30} height={30} />
              ) : (
                <Image src={logoLightMode} alt="light mode" width={30} height={30} />
              )}
            </button>
            <button type="button" className="m-0 p-0 sm:hidden" onClick={handleToggle}>
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
            <div className="flex-nowrap items-center justify-center gap-5 text-center hidden sm:flex">
              <Nav type="normal" />
            </div>
          </div>
        </div>
        <div
          ref={toggleRef}
          className="w-full h-screen absolute top-20 left-0 bg-white flex-col flex-nowrap p-5 flex hidden dark:bg-[#111111]"
        >
          <Nav type="toggle" onClick={handleToggle} />
        </div>
      </header>
    </>
  );
}
