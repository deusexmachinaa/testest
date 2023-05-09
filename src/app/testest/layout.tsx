import Navigation from "@/components/Nav";
import Link from "next/link";

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navigation title="테스트들" />
      <div className="p-6">{children}</div>
    </>
  );
}
