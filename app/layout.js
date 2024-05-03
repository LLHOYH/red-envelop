import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import { Web3Provider } from "@/contexts/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Red Envelop",
  description: "Give red envelops for your supporters",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <div className="grid h-screen gap-0 grid-rows-[100px]">
          <NavBar />
          {children}
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
