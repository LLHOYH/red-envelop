"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const AccountBind = ({ accountBinded, setAccountBinded }) => {
  const [xId, setXId] = useState("");
  const account = useAccount();

  const dummyAddress = {
    Lloyd: "0xA552c195A6eEC742B61042531fb92732F8A91D6b",
    John: "0x162bCDeEf90181676BDC0a247A1954666F8a2815",
    Seliina: "0x262bCDeEf90181676BDC0a247A1954666F8a2816",
    Christina: "0x362bCDeEf90181676BDC0a247A1954666F8a2817",
    Beauti: "0x462bCDeEf90181676BDC0a247A1954666F8a2818",
  };

  function insertDummyAddress() {
    localStorage.setItem("allAccountsDict", JSON.stringify(dummyAddress));
  }
  useEffect(() => {
    // insertDummyAddress();
    checkIfAccountBinded();

    return () => {
      setAccountBinded(false);
      setXId("");
    };
  }, [account.address]);

  function checkIfAccountBinded() {
    if (!account.address) return;

    let allAccountsDict = JSON.parse(getAllAccounts());
    if (!allAccountsDict) return;

    let bindAcc = Object.entries(allAccountsDict).find(
      (acc) => acc[1] == account.address
    );

    if (bindAcc) {
      setAccountBinded(true);
      setXId(bindAcc[0]);
    }
  }

  function handleBindTwitter() {
    setXId("li_longhao");
  }

  function handleBindAccount() {
    if (!xId || !account.address) return;
    let allAccountsDict = JSON.parse(getAllAccounts());

    if (!allAccountsDict) {
      allAccountsDict = {};
    }

    allAccountsDict[xId] = account.address;
    localStorage.setItem("allAccountsDict", JSON.stringify(allAccountsDict));

    setAccountBinded(true);
  }

  function getAllAccounts() {
    const allAccountsDict = localStorage.getItem("allAccountsDict");
    return allAccountsDict;
  }

  return (
    <main
      className={`flex ${
        accountBinded ? "items-center " : "items-start "
      } justify-center w-full h-full border-r-2`}
    >
      {accountBinded && (
        <section className="flex flex-col max-w-3xl">
          <h1 className="text-3xl bold">
            Welcome Home🎉 <span className="block">{xId}</span>{" "}
          </h1>
        </section>
      )}

      {!accountBinded && (
        <section className="flex flex-col max-w-3xl gap-3 justify-stretch">
          <h2 className="text-3xl font-bold">Bind your account</h2>
          <p>Step 1: Connect Twitter</p>
          <div className="flex items-center justify-start">
            <button className="btn btn-primary" onClick={handleBindTwitter}>
              Connect Twitter
            </button>
            <input
              type="text"
              placeholder="@twitter"
              className="w-full max-w-xs input input-bordered"
              value={xId}
              onChange={(e) => setXId(() => e.target.value)}
            />
          </div>

          <p>Step 2: Connect Wallet</p>
          {account.address && (
            <input
              placeholder="0xwallet_address"
              className="input input-bordered"
              value={account.address || ""}
              disabled
            />
          )}
          {!account.address && <ConnectButton />}

          <button
            className={`btn justify-self-end ${
              account.address ? "btn-primary" : "btn-disabled"
            }`}
            onClick={handleBindAccount}
          >
            Confirm
          </button>
        </section>
      )}
    </main>
  );
};

export default AccountBind;
