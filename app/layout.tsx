import type { Metadata } from "next";
import "./globals.css";
import NavTop from "@/components/Nav/NavTop";
import Script from "next/script";
import {
  Archivo,
  Cutive_Mono,
  Playfair_Display,
  Roboto,
  Source_Code_Pro,
} from "next/font/google";

export const metadata: Metadata = {
  title: "Tristan's homebase",
  description: "Tristan Setha's homebase",
};

const playFairDisplay = Playfair_Display({
  weight: ["600"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});
const archivo = Archivo({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
const cutiveMono = Cutive_Mono({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
const sourceCodePro = Source_Code_Pro({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${playFairDisplay.className} ${archivo.className} ${cutiveMono.className} ${roboto.className} ${sourceCodePro.className}`}
        data-theme="atmosphere"
      >
        <NavTop />
        {children}
      </body>
    </html>
  );
}
