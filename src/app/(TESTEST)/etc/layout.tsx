import Navigation from "@/components/Nav";
import Link from "next/link";

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navigation title="기타등등" href="/etc" />
    <div className="dark:bg-gray-700 py-4 flex flex-col min-h-screen">
{children}
</div>
    </>
  );
}
