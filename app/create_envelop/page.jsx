"use client";

import ChooseFollowers from "@/components/create_envelop/chooseFollowers";
import ChooseToken from "@/components/create_envelop/chooseToken";
import SetAmount from "@/components/create_envelop/setAmount";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { createContract } from "@/utils/contractInteraction";

const CreateEnvelop = () => {
  const account = useAccount();
  const [steps, setSteps] = useState(1);
  const [yourFollowers, setYourFollowers] = useState([]);
  const [targetAddresses, setTargetAddresses] = useState([]);
  const [selectedToken, setSelectedToken] = useState({});
  useEffect(() => {
    setYourFollowers(getAllOtherAccounts());
  }, [account.address]);

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
    createContract(targetAddresses, totalAmount, selectedToken.contractAddress);
  }

  return (
    <main className="flex items-center justify-center w-full py-10 gap-x-3 px-11">
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
    </main>
  );
};

export default CreateEnvelop;
