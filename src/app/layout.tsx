import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Movie Discovery",
  description: "Discover trending and popular movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
        <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
