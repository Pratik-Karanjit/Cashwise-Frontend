import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "../components/Providers";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cashwise",
  description: "A website to solve splitting bill headache.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}