import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="bg-gray-800 text-white h-full">
        <nav className="w-full flex justify-center space-x-20 text-2xl p-5">
          <Link className="cursor-pointer hover:text-gray-600" href="/">
            Image
          </Link>
          <Link className="cursor-pointer hover:text-gray-600" href="/chat">
            Chat
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
