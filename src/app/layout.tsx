import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/Provider/RecoilProvider";
import ThemeProvider from "@/Provider/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  verification: {
    google: "d_Oq6NGoTjXRSukPoXsP2mS99QkvowHLHE3zwyhBo4E",
  },
  title: {
    template: `%s | 개발자 구상모 blog`,
    default: `개발자 구상모 blog`,
  },
  description: "개발노트를 정리하는 공간입니다",
  openGraph: {
    siteName: "구상모 블로그",
  },
  twitter: {
    title: "구상모 블로그",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css"
          rel="stylesheet"
        ></link>
      </head>
      <RecoilProvider>
        <body className={inter.className}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </RecoilProvider>
    </html>
  );
}
