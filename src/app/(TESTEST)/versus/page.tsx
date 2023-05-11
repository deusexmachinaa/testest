import { versusTestItems } from "@/Data/versusTeestItem";
import Link from "next/link";

export default function Etc() {
  const content = (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {versusTestItems.slice().map((item, index) => (
        <Link
          key={index}
          href={`/versus/${item.id}`}
          className="w-72 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="h-64 flex relative">
            <div
              className="w-1/2 h-full bg-cover bg-left rounded-tl-lg"
              style={{ backgroundImage: `url(${item.image1})` }}
            ></div>
            <div
              className="w-1/2 h-full bg-cover bg-right rounded-tr-lg"
              style={{ backgroundImage: `url(${item.image2})` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-200">vs</span>
            </div>
          </div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2 text-center">
            {item.title}
          </h2>
          <p className="text-gray-600 text-sm text-center truncate">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  ); 
  

  return <div>{content}</div>;
}

