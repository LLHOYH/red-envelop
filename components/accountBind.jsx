"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { WalletButton } from "@rainbow-me/rainbowkit";

const AccountBind = ({ accountBinded, setAccountBinded }) => {
  const [xId, setXId] = useState("");
  const account = useAccount();

  const dummyAddress = {
    Lloyd: "0xA552c195A6eEC742B61042531fb92732F8A91D6b",
    // Dev2:"0x7030A91c6b4dC233F775260A04D4B3173B090154",
    John: "0xa8F5519a8213884B7c78A7B9E47a2C75cF8995eE",
    Seliina: "0xE3a463d743F762D538031BAD3f1E748BB41f96ec",
    Christina: "0x101591aca5aD4B79905e9FF05FBFF631304e4Be9",
    Beauti: "0x23651284561f0a4709372214AAbE766A0240B536",
    Lily: "0x5408DCaaa2b463fDA6DF2992950Da70F1F5e17b0",
  };

  function insertDummyAddress() {
    localStorage.setItem("allAccountsDict", JSON.stringify(dummyAddress));
  }
  function getAllAccounts() {
    const allAccountsDict = localStorage.getItem("allAccountsDict");
    return allAccountsDict;
  }

  useEffect(() => {
    let allAccountsDict = JSON.parse(getAllAccounts());
    if (!allAccountsDict) insertDummyAddress();
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
    setXId("Franky");
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
            <button
              className="text-white bg-black btn"
              onClick={handleBindTwitter}
            >
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

          <p>Step 3: Connect Wallet</p>
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
