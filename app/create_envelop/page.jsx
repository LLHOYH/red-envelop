"use client";

import ChooseFollowers from "@/components/create_envelop/chooseFollowers";
import ChooseToken from "@/components/create_envelop/chooseToken";
import { faUserSecret, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const CreateEnvelop = () => {
  const account = useAccount();
  const [steps, setSteps] = useState(1);
  const [yourFollowers, setYourFollowers] = useState([]);
  const [targetAddresses, setTargetAddresses] = useState([]);
  const [selectedToken, setSelectedToken] = useState("");
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

  return (
    <main className="flex items-center justify-center w-full py-10 gap-x-3 px-11">
      {steps === 1 && (
        <>
          <p className="text-indigo-500">Step 1: Select your followers</p>
          <ChooseFollowers
            setSteps={setSteps}
            targetAddresses={targetAddresses}
            setTargetAddresses={setTargetAddresses}
          />
        </>
      )}
      {steps === 2 && (
        <>
          <p className="text-indigo-500">Step 2: Select your tokens</p>
          <ChooseToken />
        </>
      )}
    </main>
  );
};

export default CreateEnvelop;
