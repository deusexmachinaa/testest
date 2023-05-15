import Navigation from '@/components/Nav';
import Link from 'next/link';

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation title="이상형 월드컵" href="/versus" />
      <div className=" dark:bg-black dark:text-white py-4 flex flex-col min-h-screen">
        {children}
      </div>
    </>
  );
}
