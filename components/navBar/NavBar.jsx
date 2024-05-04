import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex w-full h-[100px] bg-transparent ring-1 border-b-[1px] shadow-sm justify-end items-center gap-8 px-10">
      <Image className="self-start" src="/logo_crop.jpg" alt="logo" width={72} height={72}/>
      <Link
        className="flex items-center justify-center p-3 text-white rounded-md h-13 hover:ring-2 hover:ring-offset-2"
        href="/home"
      >
        Home
      </Link>
      <Link
        className="flex items-center justify-center p-3 text-white rounded-md h-13 hover:ring-2 hover:ring-offset-2"
        href="/create_envelop"
      >
        Create Envelope
      </Link>
      <ConnectButton />
    </nav>
  );
};

export default NavBar;
