"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { WalletButton } from '@rainbow-me/rainbowkit';

const AccountBind = ({ accountBinded, setAccountBinded }) => {
  const [xId, setXId] = useState("");
  const account = useAccount();

  const dummyAddress = {
    Lloyd: "0xA552c195A6eEC742B61042531fb92732F8A91D6b",
    John: "0x162bCDeEf90181676BDC0a247A1954666F8a2815",
    Seliina: "0x262bCDeEf90181676BDC0a247A1954666F8a2816",
    Christina: "0x362bCDeEf90181676BDC0a247A1954666F8a2817",
    Beauti: "0x462bCDeEf90181676BDC0a247A1954666F8a2818",
    Lily: "0x562bCDeEf90181676BDC0a247A1954666F8a2818",
    Angel: "0x662bCDeEf90181676BDC0a247A1954666F8a2818",
    Min: "0x762bCDeEf90181676BDC0a247A1954666F8a2818",
    Tok: "0x862bCDeEf90181676BDC0a247A1954666F8a2818",
    Sydney: "0x962bCDeEf90181676BDC0a247A1954666F8a2818",
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

  function onSuccess(data) {
    console.log("Worldcoin connect success");
    console.log(data);
  }
  function handleVerify(data) {
    console.log("handle verify worldcoin");
    console.log(data);
  }
  return (
    <main
      className={`flex ${
        accountBinded ? "items-center " : "items-start "
      } justify-center w-full h-full border-r-2`}
    >
      {accountBinded && (
        <section className="flex flex-col max-w-3xl">
          <h1 className="text-3xl font-semibold bold">
            Welcome Home🎉 <span className="block">{xId}</span>{" "}
          </h1>
        </section>
      )}

      {!accountBinded && (
        <section className="flex flex-col max-w-3xl gap-3 justify-stretch">
          <h2 className="text-3xl font-bold">Bind your account</h2>
          <p>Step 1: Connect Twitter</p>
          <div className="flex items-center justify-start">
            <button className="text-white bg-black btn" onClick={handleBindTwitter}>
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

          <p>Step 2: Connect Worldcoin</p>
          <IDKitWidget
            app_id="app_staging_25940849cf103fa57cf1e1a60552242e" // obtained from the Developer Portal
            action="verifyidentity" // this is your action id from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // optional callback when the proof is received
            verification_level={VerificationLevel.Device}
          >
            {({ open }) => (
              <div
                className="flex items-center justify-center bg-white border-2 cursor-pointer h-11 rounded-3xl"
                onClick={open}
              >
                <button className="text-white bg-no-repeat bg-center bg-[url('/worldcoinLogo.svg')] rounded-3xl w-1/2 h-11"></button>
              </div>
            )}
          </IDKitWidget>

          <p>Step 2: Connect Wallet</p>
          {account.address && (
            <input
              placeholder="0xwallet_address"
              className="input input-bordered"
              value={account.address || ""}
              disabled
            />
          )}
          {!account.address && <WalletButton wallet="metamask" />}

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
