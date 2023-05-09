import Link from "next/link";
import "./globals.css";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
import { allPosts } from "contentlayer/generated";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  function setInitialColorMode() {
    function getInitialColorMode() {
      const preference = window.localStorage.getItem('theme');
      const hasExplicitPreference = typeof preference === 'string';
  
      if (hasExplicitPreference) {
        return preference;
      }
  
      const mediaQuery = '(prefers-color-scheme: dark)';
      const mql = window.matchMedia(mediaQuery);
      const hasImplicitPreference = typeof mql.matches === 'boolean';
      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light';
      }
  
      return 'dark';
    }
    const colorMode = getInitialColorMode();
    document.body.className = colorMode;
  }
  
  const blockingSetInitialColorMode = `(function() {
      ${setInitialColorMode.toString()}
      setInitialColorMode();
  })()
  `;

  function Document() {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode,
          }}
        ></script>
      </>
    );
  }
  
  return (
    <html>
      <body>
        <Document />
        <div className="flex flex-col min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
