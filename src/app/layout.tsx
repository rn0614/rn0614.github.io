import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import RecoilProvider from "@/Provider/RecoilProvider";

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
    images: {
      url: "/image/HappyFace.jpg",
    },
  },
  twitter: {
    title: "구상모 블로그",
    images: {
      url: "/image/HappyFace.jpg",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilProvider>
  );
}
