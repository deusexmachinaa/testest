import Link from "next/link";
import { useMemo } from "react";
import testest_black from "/public/testest_black.png";
import testest_white from "/public/testest_white.png";

interface MenuItem {
    title: string;
    description: string;
    href: string;
    image: string;
  }
  
  export const MenuItems: MenuItem[] = [
    {
      title: "테스트들",
      description: "심리테스트 및 여러 흥미로운 테스트들로 이동합니다.",
      href: "/testest",
      image: "https://source.unsplash.com/1600x900/?test",
    },
    {
      title: "이상형월드컵",
      description: "이상형월드컵으로 이동합니다.",
      href: "/versus",
      image: "https://source.unsplash.com/1600x900/?versus",
    },
    {
      title: "잡동사니",
      description: "잡동사니로 이동합니다.",
      href: "/etc",
      image: "https://source.unsplash.com/1600x900/?etc",
    },
    {
      title: "개발일지",
      description: "개발일지로 이동합니다.",
      href: "/DevLog",
      image: "https://source.unsplash.com/1600x900/?dev",
    },
    // 필요한 만큼 메뉴 항목 추가
  ];

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
import Image from "next/image";

export interface NavProps {
    title : string;
  }


export default function Navigation({ title }:NavProps) {
    return (
        <>
      <nav className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto pr-6 py-4">
          <div className="flex items-center justify-between">
            <div>
                <Link href="/">
                    <Image
                        src={testest_white}
                        alt="profile"
                        width={180}
                        height={30}
                        />
                </Link>
            </div>
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
            <Link href={"/testest"}>{title}</Link>
          </h2>
            <div>
              <MainMenuName />
            </div>
          </div>
        </div>
      </nav>
        </>
    );
  }