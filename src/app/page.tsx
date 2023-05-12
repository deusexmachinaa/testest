import { MenuItemsEmergency } from "@/Data/MainMenu";
import Footer from "@/components/Footer";
import Navigation from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Navigation title="" href="/" />
    <div className="dark:bg-gray-700 py-4 flex flex-col min-h-screen">
      <div className="flex justify-center flex-wrap gap-4 p-8">
        {MenuItemsEmergency.map((item, index) => (
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
    </div>
    <Footer />
        </>
  );
}
