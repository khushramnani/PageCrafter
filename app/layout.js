
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/sessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <SessionWrapper>
       <Navbar/>
        <div className="min-h screen">

        {children}
        </div>
        <Footer/>
      </SessionWrapper>
        </body>
      
    </html>
  );
}
