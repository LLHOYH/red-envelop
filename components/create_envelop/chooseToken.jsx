"use client";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const config = {
  apiKey: "cmESqI7lQ9VncnHhCJuTwPZrAzO9SUkR",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

const ChooseToken = () => {
  const account = useAccount();
  const [tokenList, setTokenList] = useState([]);
  // Get token balances
  useEffect(() => {
    getTokenList();
  }, []);

  async function getTokenList() {
    let tokens = await alchemy.core.getTokensForOwner(account.address);
    console.log(tokens);
    setTokenList(tokens.tokens);
  }
  return (
    <section className="w-[600px] gap-y-2 h-full flex flex-col justify-stretch items-center">
      Choose Tokens:
      {tokenList.map((token) => {
        return (
          <div
            key={token.contractAddress}
            className="grid grid-cols-[40px,70px,auto,auto] content-center w-full h-[60px] px-3 rounded-2xl gap-x-2 bg-gradient-to-r from-sky-500 to-indigo-500"
          >
            <p className="rounded-full flex justify-center items-center h-[40px] w-[40px] bg-white border-2">
              {token.symbol.substring(0, 1).toUpperCase()}
            </p>
            <p className="flex items-center">{token.symbol}</p>
            <p className="flex items-center overflow-ellipsis">
              {token.balance}
            </p>
            {token.balance > 0 && (
              <input
                type="checkbox"
                className="self-center w-4 h-4 justify-self-end"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ChooseToken;
