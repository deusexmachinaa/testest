import Image from "next/image";
import Link from "next/link";

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
  // 필요한 만큼 메뉴 항목 추가
];

export default function Home() {
  return (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {MenuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="w-72 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            className="h-48 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2 text-center">
            {item.title}
          </h2>
          <p className="text-gray-600 text-sm text-center">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
