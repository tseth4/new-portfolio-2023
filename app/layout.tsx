import type { Metadata } from "next";
import "./globals.css";
// import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Tristan's homebase",
  description: "Tristan's homebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        data-theme="dark"
      // style={bodyStyle}
      >{children}</body>
    </html>
  );
}
