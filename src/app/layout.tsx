import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./widgets/Navbar";
import ReactQueryProvider from '../providers/ReactQueryProvider';

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
      <head>
        
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />

      </head>
      <body className="font-open-sans antialiased">
        <Navbar />

        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
