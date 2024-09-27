import type { Metadata } from "next";
import "./globals.css";
import HeaderFooter from "./widgets/HeaderFooter";

export const metadata: Metadata = {
  title: "Boilerplate",
  description: "Insane boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="font-open-sans antialiased">
        <HeaderFooter />
        {children}
      </body>
    </html>
  );
}
