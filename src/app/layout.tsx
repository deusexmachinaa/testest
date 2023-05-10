import "./globals.css";
import Footer from "../components/Footer";
import Providers from "./provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode,
          }}
        ></script>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
