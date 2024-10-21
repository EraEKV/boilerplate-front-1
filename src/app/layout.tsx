import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./widgets/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
