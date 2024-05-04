"use client";

import { generateProof } from "@/utils/MerkleTree";
import { abi } from "@/utils/abi";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";

const FollowList = ({ accountBinded }) => {
  const account = useAccount();
  const [claimable, setClaimable] = useState(false);
  const contractAddr = {
    baseSepolia: "0x3407eaB00a4fa31F0f4f8F5152BA8F7C13A00970",
  };

  const [yourFollowing, setYourFollowing] = useState([
    ["Ceneca", "0xFC73379D9c1109C4b7502d6A848e0efB7E148f6e"],
    ["Ensem", "0xA4F89B9D9c110cF4b7501Ed6A848e0efB7E108eaA"],
    ["Lloyd", "0xA552c195A6eEC742B61042531fb92732F8A91D6b"],
  ]);

  const [yourFollowers, setYourFollowers] = useState([]);
  const {
    data: claimHash,
    error: claimError,
    isPending,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    if (
      account.address === "0x7030A91c6b4dC233F775260A04D4B3173B090154" &&
      getEnvelopesFromStorage().length > 0
    ) {
      setClaimable(true);
    }
    setYourFollowers(getAllOtherAccounts() || []);
  }, [account.address]);

  useEffect(() => {
    if (claimHash) {
      console.log("claimhash", claimHash);
    }
  }, [claimHash]);

  useEffect(()=>{
    console.log("claimError",claimError)
  },[claimError])

  function getEnvelopesFromStorage() {
    const envelopes = JSON.parse(localStorage.getItem("envelopes"));
    return envelopes || [];
  }

  function getAllOtherAccounts() {
    if (!account.address) return [];

    let allAccountsDict = JSON.parse(getAllAccounts());
    if (!allAccountsDict) return [];

    let allOtherAccounts = Object.entries(allAccountsDict).filter(
      (acc) => acc[1] !== account.address
    );

    return allOtherAccounts;
  }

  function getAllAccounts() {
    const allAccountsDict = localStorage.getItem("allAccountsDict");
    return allAccountsDict;
  }

  function handleClaimEnvelope() {
    let envelopes = getEnvelopesFromStorage();
    if (envelopes.length === 0) return;

    let envelope = envelopes[envelopes.length - 1];
    let merkleRoot = envelope.merkleRoot;
    let hashHexProof = envelope.hashHexProof;
    console.log(envelope);

    console.log({
      address: contractAddr.baseSepolia,
      abi,
      functionName: "claimRedPacket",
      args: [envelope.envelopeId, envelope.targetAmount, hashHexProof],
      chainId: baseSepolia.id,
    })

    writeContract({
      address: contractAddr.baseSepolia,
      abi,
      functionName: "claimRedPacket",
      args: [envelope.envelopeId, envelope.totalAmount, hashHexProof],
      chainId: baseSepolia.id,
    });
  }

  return (
    <main className="flex flex-col w-full h-full px-10 border-l-2 ">
      {accountBinded && (
        <>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="mb-4 text-2xl font-semibold">Your Following</h1>
            {yourFollowing.map((following, _index) => (
              <div
                key={following[1]}
                className="grid grid-cols-[100px,auto,1fr] h-[50px] justify-center items-center w-full gap-y-2"
              >
                <Image
                  src={`/${_index + 1}.png`}
                  alt={following[0]}
                  width={50}
                  height={50}
                  className=" rounded-3xl"
                />
                <p>{following[0]}</p>
                {claimable && following[0] === "Lloyd" && (
                  <div
                    className="flex items-center justify-center w-full cursor-pointer"
                    onClick={handleClaimEnvelope}
                  >
                    <FontAwesomeIcon icon={faSackDollar} bounce />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-start w-full mt-8">
            <h1 className="my-4 text-2xl font-semibold">Your Followers</h1>
            {yourFollowers.map((follower, _index) => (
              <div
                key={follower[1]}
                className="grid grid-cols-[100px,auto,1fr] h-[50px] justify-center items-center w-full gap-y-2"
              >
                <Image
                  src={`/${_index + 1}.png`}
                  alt={follower[0]}
                  width={50}
                  height={50}
                  className="rounded-3xl"
                />
                <p className="">{follower[0]}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {!accountBinded && (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="font-bold">Bind your account to start</h1>
        </div>
      )}
    </main>
  );
};

export default FollowList;
