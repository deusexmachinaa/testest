import Link from "next/link";

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-3">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
            <Link href={"/etc"}>기타등등</Link>
          </h2>
        </div>
      </div>
      {children}
    </>
  );
}
