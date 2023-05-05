import Link from "next/link";
import "./globals.css";
import { dir } from "i18next";
import { detectLanguage } from "./i18n";
import { Trans } from "react-i18next";
import { languages } from "./i18n/settings";

function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-xl font-semibold text-gray-800 dark:text-white"
              href="/"
            >
              로고
            </Link>
          </div>
          <div>
            <ul className="flex items-center space-x-4">
              <Link
                className="text-gray-800 dark:text-white hover:text-blue-500"
                href="/psychological-test"
              >
                심리테스트
              </Link>
              <Link
                className="text-gray-800 dark:text-white hover:text-blue-500"
                href="/ideal-type-world-cup"
              >
                이상형월드컵
              </Link>
              <Link
                className="text-gray-800 dark:text-white hover:text-blue-500"
                href="/etc"
              >
                잡동사니
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-4">
      <div className="container mx-auto px-3">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          TesTesT
        </h2>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p> 문의: testest.help@gmail.com</p>
      <p>&copy; {new Date().getFullYear()} Taehun.</p>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = detectLanguage();
  return (
    <html lang={lng} dir={dir(lng)}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Navigation />
          <Hero />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </html>
  );
}
