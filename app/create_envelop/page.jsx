"use client";

import ChooseFollowers from "@/components/create_envelop/chooseFollowers";
import ChooseToken from "@/components/create_envelop/chooseToken";
import SetAmount from "@/components/create_envelop/setAmount";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWatchContractEvent,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "@/utils/abi";
import { generateEachAmount, generateMerkleTree } from "@/utils/MerkleTree";
import { sepolia, baseSepolia } from "viem/chains";
import { erc20abi } from "@/utils/erc20abi";
import { config } from "@/contexts/Web3Provider";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const CreateEnvelop = () => {
  const account = useAccount();
  const [steps, setSteps] = useState(1);
  const [yourFollowers, setYourFollowers] = useState([]);
  const [targetAddresses, setTargetAddresses] = useState([]);
  const [selectedToken, setSelectedToken] = useState({});
  const {
    data: hash,
    error: cError,
    isPending,
    writeContract,
  } = useWriteContract();

  const contractAddr = {
    baseSepolia: "0x8b3aC863fbD4F1dc4ce19004a34449E9d1479D8C",
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    setYourFollowers(getAllOtherAccounts());
  }, [account.address]);

  useEffect(() => {
    console.log("hash changed", hash);
  }, [hash]);

  useEffect(() => {
    console.log("error ", cError);
  }, [cError]);

  function getAllOtherAccounts() {
    if (!account.address) return [];

    let allAccountsDict = JSON.parse(getAllAccounts());
    if (!allAccountsDict) return;

    let allOtherAccounts = Object.entries(allAccountsDict).filter(
      (acc) => acc[1] !== account.address
    );

    return allOtherAccounts || [];
  }

  function getAllAccounts() {
    const allAccountsDict = localStorage.getItem("allAccountsDict");
    return allAccountsDict;
  }

  async function createEnvelope(totalAmount) {
    // createContract(targetAddresses, totalAmount, selectedToken.contractAddress);

    const envelopeList = generateEachAmount(totalAmount, targetAddresses);
    const merkleTree = generateMerkleTree(envelopeList);
    // const startTime = Math.floor(Date.now() / 1000); //currenttime in seconds
    const duration = 3 * 24 * 60 * 60; // 3 days, in seconds

    setApprovalOnERC20(totalAmount);

    await writeContract({
      address: contractAddr.baseSepolia,
      abi,
      functionName: "createRedPacket",
      args: [
        "0x" + merkleTree.getRoot().toString("hex"),
        totalAmount,
        // startTime,
        duration,
        selectedToken.contractAddress,
      ],
      chainId: baseSepolia.id,
    });
  }

  async function setApprovalOnERC20(totalAmount) {
    await writeContract({
      address: selectedToken.contractAddress,
      abi: erc20abi,
      functionName: "approve",
      args: [contractAddr.baseSepolia, totalAmount],
      chainId: baseSepolia.id,
    });
  }

  function onEnvelopeCreated() {
    
  }

  return (
    <main className="flex items-center justify-center w-full py-10 gap-x-3 px-11">
      {isConfirming && (
        <span className="loading loading-spinner loading-xl"></span>
      )}
      {isConfirmed && <div>Red Envelope Created!</div>}
      {!isConfirming && !isConfirmed && (
        <>
          {steps === 1 && (
            <>
              <p className="font-semibold">
                Step 1: <br /> Select your followers
              </p>
              <ChooseFollowers
                setSteps={setSteps}
                targetAddresses={targetAddresses}
                setTargetAddresses={setTargetAddresses}
              />
            </>
          )}
          {steps === 2 && (
            <>
              <p className="font-semibold">
                Step 2: <br /> Select your tokens
              </p>
              <ChooseToken
                setSteps={setSteps}
                setSelectedToken={setSelectedToken}
              />
            </>
          )}
          {steps === 3 && (
            <>
              <p className="font-semibold">
                Step 3:
                <br /> Set envelope amount
              </p>
              <SetAmount
                setSteps={setSteps}
                selectedToken={selectedToken}
                numOfEnvelopes={targetAddresses.length}
                createEnvelope={createEnvelope}
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default CreateEnvelop;
