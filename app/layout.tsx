import type { Metadata } from "next";
import "./globals.css";
// import Nav from "@/components/Nav";

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
        data-theme="dark"
      // style={bodyStyle}
      >{children}</body>
    </html>
  );
}
