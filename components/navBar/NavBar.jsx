import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const NavBar = () => {
    return ( <nav className="flex w-full h-[100px] bg-transparent ring-1 border-b-[1px] shadow-sm justify-end items-center gap-8 px-10">
        <Link className="text-white" href="/home">Home</Link>
        <Link className="text-white" href="/create_envelop">Create Envelope</Link>
        <ConnectButton/>
    </nav> );
}
 
export default NavBar;