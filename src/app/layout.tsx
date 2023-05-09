import "./globals.css";
import Footer from "../components/Footer";
import Providers from "./provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
