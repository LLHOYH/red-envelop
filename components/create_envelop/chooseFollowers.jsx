"use client";

import { faUserSecret, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const ChooseFollowers = ({ targetAddresses, setTargetAddresses,setSteps }) => {
  const account = useAccount();

  const [yourFollowers, setYourFollowers] = useState([]);

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

  function handleFollowersChecked([xId, address]) {
    if (targetAddresses.includes(address))
      setTargetAddresses(targetAddresses.filter((addr) => addr != address))
    else setTargetAddresses([...targetAddresses, address])
  }

  function handleToNextStep(){
    setSteps(2);
  }

  return (
    <section className="w-[600px] h-full flex flex-col justify-start items-center gap-y-2">
      {/* <section
        title="envelopType"
        className="flex justify-start items-center w-full h-[80px] gap-9"
      >
        <div className="flex flex-col items-center h-full ">
          <button className="h-[60px] w-[60px] bg-black overflow-hidden rounded-xl shadow-2xl">
            <FontAwesomeIcon
              icon={faUserSecret}
              style={{ color: "#ffffff" }}
              className="text-4xl"
            />
          </button>
          <p className="text-sm">Followers</p>
        </div>
        <div className="flex flex-col items-center h-full ">
          <button className="h-[60px]  w-[60px] bg-black  shadow-2xl overflow-hidden rounded-xl">
            <FontAwesomeIcon
              icon={faUsersLine}
              style={{ color: "#ffffff" }}
              className="text-4xl"
            />
          </button>
          <p className="text-sm">Public</p>
        </div>
      </section> */}
      <section
        title="followerList"
        className="flex flex-col items-center justify-start w-full px-4 pt-2 border-black rounded-l-lg gap-y-2 h-full min-h-[400px] border-l-4"
      >
        {yourFollowers.map((follower, _index) => (
          <div
            key={follower[1]}
            className="grid content-center w-full grid-cols-[60px,100px,auto,1fr]"
          >
            <Image
              src={`/${_index + 1}.png`}
              alt={follower[0]}
              width={50}
              height={50}
            />
            <p className="flex items-center justify-start">{follower[0]}</p>
            <p className="flex items-center justify-start">
              {follower[1].substring(0, 10) + "..."}
            </p>
            <input
              type="checkbox"
              className="justify-self-end"
              onChange={(e) => handleFollowersChecked(follower)}
            />
          </div>
        ))}
      </section>
      {targetAddresses.length > 0 && <button className="btn btn-primary" onClick={handleToNextStep}>Next Step</button>}
    </section>
  );
};

export default ChooseFollowers;
