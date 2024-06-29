import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "출석 관리 시스템",
  description: "봉사 출석을 관리하는 시스템입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>출석 관리 시스템</title>
        <meta name="description" content="봉사 출석을 관리하는 시스템입니다." />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
