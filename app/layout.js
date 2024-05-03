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
          <div className="grid h-screen gap-0 grid-rows-[80px] bg-gradient-to-r from-sky-500 to-indigo-500">
            <NavBar />
            <main className="flex items-start justify-center w-full mt-11">
              <section className="w-[642px] h-max min-h-[600px] bg-white rounded-3xl shadow-2xl flex items-stretch">
                {children}
              </section>
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
