import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const NavBar = () => {
    return ( <nav className="flex w-full h-[100px] bg-black justify-end items-center gap-8 px-10">
        <Link className="text-white" href="/home">Home</Link>
        <ConnectButton/>
    </nav> );
}
 
export default NavBar;