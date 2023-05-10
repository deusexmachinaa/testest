import Link from "next/link";

interface VersusItem {
  index: number;
  title: string;
  description: string;
  href: string;
  image1: string;
  image2: string;
}

export const TestItems: VersusItem[] = [
  {
    index: 1,
    title: "여자연예인 월드컵",
    description: "여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)여자연예인 월드컵 테스트(테스트)",
    href: "1",
    image1: "https://source.unsplash.com/1600x900/?versus",
    image2: "https://source.unsplash.com/1600x900/?versus",
  },
  {
    index: 2,
    title: "2testsetstest",
    description: "이상형월드컵 테스트(테스트)",
    href: "2",
    image1: "https://i.imgur.com/su7vcgh.jpeg",
    image2: "https://source.unsplash.com/1600x900/?versus",
  },
  
];

export default function Etc() {
  const content = (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {TestItems.slice().map((item, index) => (
        <Link
          key={index}
          href={`/versus/${item.href}`}
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

