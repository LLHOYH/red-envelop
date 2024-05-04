import { config } from "./config";
import { abi } from "./abi";
import { generateEachAmount, generateMerkleTree } from "./MerkleTree";

const contractAddr = {
  baseSepolia: "0xe6b2EDD6D0Bcf772174Fa91BdB8D420d761c5270",
};


export async function createContract(addresses, totalAmount, erc20Token) {
  const envelopeList = generateEachAmount(totalAmount, addresses);
  const merkleTree = generateMerkleTree(envelopeList);
  const startTime = Math.floor(Date.now() / 1000); //currenttime in seconds
  const duration = 3 * 24 * 60 * 60; // 3 days, in seconds
  

  const result = (config, {
    abi,
    address: contractAddr.baseSepolia,
    functionName: "createRedPacket",
    args: [
      merkleTree.getRoot(),
      parseFloat(totalAmount),
      startTime,
      duration,
      erc20Token,
    ],
  });

  console.log(result);
}
