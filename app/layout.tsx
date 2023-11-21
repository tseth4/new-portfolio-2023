import type { Metadata } from "next";
import "./globals.css";
import NavTop from "@/components/Nav/NavTop";
// import Background from "@/components/Background/Background";

export const metadata: Metadata = {
  title: "Tristan Setha's homebase",
  description: "Tristan Setha's homebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        data-theme="atmosphere"
        // style={bodyStyle}
      >
        <NavTop />
        {/* <Background /> */}
        {children}
      </body>
    </html>
  );
}
