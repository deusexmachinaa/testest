import Link from "next/link";

interface TestItem {
  title: string;
  description: string;
  href: string;
  image: string;
}

const TestItems: TestItem[] = [
  {
    title: "반응속도 테스트",
    description: "반응속도를 테스트 해보세요!",
    href: "testest/ReactionTimeTest",
    image: "https://source.unsplash.com/1600x900/?reaction",
  },
];

export default function TesTesT() {
  const content = (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {TestItems.map((item, index) => (
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

  return <div>{content}</div>;
}
