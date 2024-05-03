"use client";

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

  function handleFollowersChecked([xId, address]) {
    console.log(xId, address);
  }

  return (
    <main className="flex flex-col w-full h-full px-10 border-l-2 ">
      {accountBinded && (
        <>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-2xl font-semibold">Your Following</h1>
            {yourFollowing.map((following) => (
              <div
                key={following[1]}
                className="grid grid-cols-[100px,auto] ml-4"
              >
                <p>{following[0]}</p>
                <p>{following[1].substring(0, 10) + "..."}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-start w-full mt-16">
            <h1 className="my-4 text-2xl font-semibold">Your Followers</h1>
            {yourFollowers.map((follower) => (
              <div
                key={follower[1]}
                className="grid grid-cols-[100px,auto,1fr] ml-4 w-full"
              >
                <p>{follower[0]}</p>
                <p>{follower[1].substring(0, 10) + "..."}</p>
                {/* <input type="checkbox" className="justify-self-end" onChange={()=>handleFollowersChecked(follower)}/> */}
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
