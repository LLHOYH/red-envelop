"use client";

import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const SetAmount = ({ setSteps, selectedToken, numOfEnvelopes,createEnvelope }) => {
  const account = useAccount();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedDistribution, setSelectedDistribution] = useState("Equal");

  return (
    <section
      className={`w-[600px] gap-y-5 h-full flex flex-col  justify-center
       items-start`}
    >
      <p>Enter Total Amount:</p>
      <div>
        <input
          placeholder="total amount"
          type="number"
          max={selectedToken.balance}
          className="input border-2 border-solid border-[#0ea5e9] ring-0 outline-none"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
        <p className="inline text-">Max: {selectedToken.balance}</p>
      </div>

      <p>
        Distribution to <span className="font-bold">{numOfEnvelopes}</span>{" "}
        Envelope
      </p>
      <div>
        <button
          className={`w-[100px] h-[50px] rounded-md border  ${
            selectedDistribution === "Equal"
              ? "bg-sky-400 hover:bg-sky-500"
              : "bg-white hover:bg-zinc-100 border-2 border-sky-400"
          } `}
          onClick={() => setSelectedDistribution("Equal")}
        >
          Equal
        </button>
        <button
          className={`w-[100px] h-[50px] rounded-md border  ${
            selectedDistribution === "Random"
              ? "bg-sky-400 hover:bg-sky-500"
              : "bg-white hover:bg-zinc-100 border-2 border-sky-400"
          } `}
          onClick={() => setSelectedDistribution("Random")}
        >
          Random
        </button>
        <p>Distribution to each envelope</p>
      </div>

      <button
        className={`w-[150px] h-[50px] rounded-md border cursor-pointer bg-sky-400 hover:bg-sky-500`}
          onClick={()=>createEnvelope(totalAmount)}
      >
        Create Envelope
      </button>
    </section>
  );
};

export default SetAmount;
