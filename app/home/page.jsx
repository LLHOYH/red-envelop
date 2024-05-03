'use client'

import AccountBind from "@/components/accountBind";
import FollowList from "@/components/followList";
import { generateMerkleTree, generateProof } from "@/utils/MerkleTree";
import { useState } from "react";

const Home = () => {

  const [accountBinded, setAccountBinded] = useState(false);



  return(
    <main className="grid w-full grid-cols-[3fr,2fr] py-9">
      <AccountBind accountBinded={accountBinded} setAccountBinded={setAccountBinded}/>
      <FollowList accountBinded={accountBinded}/>
    </main>
  )
};

export default Home;
