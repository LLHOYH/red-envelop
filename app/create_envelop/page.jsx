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
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenApproved, setTokenApproved] = useState(false);
  const [merkleRoot, setMerkleRoot] = useState("");
  const [hashHexProof,setHashHexProof] = useState(null);
  const [targetAmount, setTargetAmount] =useState(0);
  const {
    data: hash,
    error: cError,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    data: approvalHash,
    error: aError,
    isPending: aPending,
    writeContract: writeContractApproval,
  } = useWriteContract();

  const contractAddr = {
    baseSepolia: "0xFb828d1a155787C3994F86DfE93E7db124fd95d1",
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
    if (hash) {
      let envelope = {
        owner: account.address,
        totalAmount,
        erc20token: selectedToken.contractAddress,
        merkleRoot,
        hashHexProof,
        targetAmount
      };
      let envelopes = getEnvelopesFromStorage();
      let envelopeId = 0;
      if (envelopes.length !== 0)
        envelopeId = envelopes[envelopes.length - 1].envelopeId + 1;

      envelope = { ...envelope, envelopeId };
      console.log(envelope);

      envelopes.push(envelope);
      console.log(envelopes);
      setEnvelopes(envelopes);
    }
  }, [hash]);

  useEffect(() => {
    if (approvalHash) {
      setTokenApproved(true);
    }
  }, [approvalHash]);

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

  function createEnvelope(totalAmount) {
    // createContract(targetAddresses, totalAmount, selectedToken.contractAddress);

    const envelopeList = generateEachAmount(totalAmount, targetAddresses);
    const {rootHash, hashHexProof,targetAmount} = generateMerkleTree(envelopeList);
    const duration = 3 * 24 * 60 * 60; // 3 days, in seconds

    if (!tokenApproved) setApprovalOnERC20(totalAmount);
    else {
      writeContract({
        address: contractAddr.baseSepolia,
        abi,
        functionName: "createRedPacket",
        args: [
          rootHash,
          totalAmount*100,
          duration,
          selectedToken.contractAddress,
        ],
        chainId: baseSepolia.id,
      });
    }

    setTotalAmount(() => totalAmount);
    setMerkleRoot(() => rootHash);
    setHashHexProof(()=>hashHexProof);
    setTargetAmount(()=>targetAmount)
  }

  function setApprovalOnERC20(totalAmount) {
    writeContractApproval({
      address: selectedToken.contractAddress,
      abi: erc20abi,
      functionName: "approve",
      args: [contractAddr.baseSepolia, totalAmount*100],
      chainId: baseSepolia.id,
    });
  }

  function getEnvelopesFromStorage() {
    const envelope = JSON.parse(localStorage.getItem("envelopes"));
    return envelope || [];
  }

  function setEnvelopes(envelopes) {
    localStorage.setItem("envelopes", JSON.stringify(envelopes));
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
                tokenApproved={tokenApproved}
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default CreateEnvelop;
