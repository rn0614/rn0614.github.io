import "@radix-ui/themes/styles.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "@/Provider/RecoilProvider";
import ThemeProvider from "@/Provider/ThemeProvider";
import { useLocale } from "next-intl";
import NextIntlProvider from "@/Provider/NextIntlProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// verification : naver 인지 못해서 any로 변경
export const metadata: Metadata = {
  verification: {
    google: "d_Oq6NGoTjXRSukPoXsP2mS99QkvowHLHE3zwyhBo4E",
  },
  keywords: "front end , front , blog , portfolio, 구상모",
  title: {
    template: `%s | 개발자 구상모 blog`,
    default: `개발자 구상모 blog`,
  },
  description: "개발노트를 정리하는 공간입니다",
  openGraph: {
    title: "구상모 블로그",
    description:
      "엔지니어 구상모의 블로그 , 프론트 위주의 학습, 문제를 해결하는 개발자",
    url: "https://rn0614.github.io",
  },
  twitter: {
    title: "구상모 블로그",
  },
  icons: {
    icon: "/logo_koo_sm.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css"
          rel="stylesheet"
        ></link>
      </head>
      <NextIntlProvider>
        <RecoilProvider>
          <body className={inter.className}>
            <ThemeProvider>{children}</ThemeProvider>
          </body>
        </RecoilProvider>
      </NextIntlProvider>
    </html>
  );
}
