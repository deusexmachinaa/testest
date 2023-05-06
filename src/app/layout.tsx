import Link from "next/link";
import "./globals.css";
import { MenuItems } from "./page";
import Hero from "./components/hero";
import Footer from "./components/Footer";
// import { dir } from "i18next";
// import { detectLanguage } from "./i18n";
// import { Trans } from "react-i18next";
// import { languages } from "./i18n/settings";

function MainMenuName() {
  return (
    <ul className="flex items-center space-x-4">
      {MenuItems.map((item, index) => (
        <li key={index}>
          <Link
            key={index}
            href={item.href}
            className="text-gray-800 dark:text-white hover:text-blue-500"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

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
              로고(TesTesT)
            </Link>
          </div>
          <div>
            <MainMenuName />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navigation />
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">{children}</div>
        </div>
      </body>
      <Footer />
    </html>
  );
}
