import { writeContract } from "@wagmi/core";
import { config } from "./config";
import { abi } from "./abi";
import { generateEachAmount, generateMerkleTree } from "./MerkleTree";
const contractAddr = {
  sepolia: "0xb04D016D56Fd21325294788Ee69a6c5Ef1da20f4",
};

export async function createContract(addresses, totalAmount, erc20Token) {
  const envelopeList = generateEachAmount(totalAmount, addresses);
  const merkleTree = generateMerkleTree(envelopeList);
  const startTime = Math.floor(Date.now() / 1000); //currenttime in seconds
  const duration = 3 * 24 * 60 * 60; // 3 days, in seconds

  console.log({
    abi,
    address: contractAddr.sepolia,
    functionName: "createRedPacket",
    args: [merkleTree.getRoot(), parseFloat(totalAmount), startTime, duration, erc20Token],
  });
  const result = await writeContract(config, {
    abi,
    address: contractAddr.sepolia,
    functionName: "createRedPacket",
    args: [merkleTree.getRoot(), parseFloat(totalAmount), startTime, duration, erc20Token],
  });

  console.log(result);
}
