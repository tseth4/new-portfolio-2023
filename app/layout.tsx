import type { Metadata } from "next";
import "./globals.css";
import NavTop from "@/components/Nav/NavTop";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tristan's homebase",
  description: "Tristan Setha's homebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        id="gtm-script"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
      ></Script>
      <Script strategy="afterInteractive" id="gtm-script-datalayer">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GTM_ID}');`}
      </Script>
      <body data-theme="atmosphere">
        <NavTop />
        {children}
      </body>
    </html>
  );
}
