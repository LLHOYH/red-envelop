"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const FollowList = ({ accountBinded }) => {
  const account = useAccount();
  const yourFollowing = [
    ["Ceneca", "0xFC73379D9c1109C4b7502d6A848e0efB7E148f6e"],
    ["Ensem", "0xA4F89B9D9c110cF4b7501Ed6A848e0efB7E108eaA"],
  ];

  const [yourFollowers, setYourFollowers] = useState([]);

  useEffect(() => {
    setYourFollowers(getAllOtherAccounts() || []);
  }, [account.address]);

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

  return (
    <main className="flex flex-col w-full h-full px-10 border-l-2 ">
      {accountBinded && (
        <>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="mb-4 text-2xl font-semibold">Your Following</h1>
            {yourFollowing.map((following,_index) => (
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
