import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cashwise",
  description: "A website to solve splitting bill headache.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <div style={{ paddingTop: "10vh" }}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}