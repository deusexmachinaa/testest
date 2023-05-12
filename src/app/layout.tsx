import { QueryLayout } from "./QueryLayout";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";
import ThemeLayout from "./ThemeProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <ThemeLayout>
        <QueryLayout>
          {children}
          </QueryLayout>
        </ThemeLayout>
      </body>
    </html>
  );
}
