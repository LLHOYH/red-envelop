"use client";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const config = {
  apiKey: "cmESqI7lQ9VncnHhCJuTwPZrAzO9SUkR",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

const ChooseToken = ({setSteps, setSelectedToken}) => {
  const account = useAccount();
  const [tokenList, setTokenList] = useState([]);
  const [loading, setLoading] = useState(true)
  // Get token balances
  useEffect(() => {
    getTokenList();
  }, []);

  async function getTokenList() {
    let tokens = await alchemy.core.getTokensForOwner(account.address);
    console.log(tokens);
    setTokenList(tokens.tokens);
    setLoading(false)
  }

  function handleTokenSelected(token){
    setSelectedToken(token);
    setSteps(3);
  }
  return (
    <section className={`w-[600px] gap-y-2 h-full flex flex-col ${loading ? "justify-center" : "justify-stretch"} items-center`}>
      {loading && <span className="loading loading-spinner loading-lg"></span>}
      {tokenList.map((token) => {
        return (
          <div
            key={token.contractAddress}
            className="grid grid-cols-[40px,70px,auto,auto] content-center w-full h-[60px] px-3 rounded-2xl gap-x-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-700 hover:to-indigo-700 cursor-pointer"
            onClick={()=>handleTokenSelected(token)}
          >
            <p className="rounded-full flex justify-center items-center h-[40px] w-[40px] bg-white border-2">
              {token.symbol.substring(0, 1).toUpperCase()}
            </p>
            <p className="flex items-center">{token.symbol}</p>
            <p className="flex items-center overflow-ellipsis">
              {token.balance}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default ChooseToken;
