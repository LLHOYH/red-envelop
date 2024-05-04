import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers, getAddress, solidityPackedKeccak256 } from "ethers";

export function generateMerkleTree(envelopeList) {
  //store leaf node into buffer
  let targetAmount = 0;
  let targetNode={}
  const leafNodes = envelopeList.map((env) => {
    console.log(env);
    let checksumAddress = getAddress(env[0]);
    let encoded = solidityPackedKeccak256(
      ["address", "uint256"],
      [checksumAddress, env[1]]
    );
    console.log(encoded);
    if (env[0] === "0x7030A91c6b4dC233F775260A04D4B3173B090154"){
      targetAmount = env[1];
      targetNode=encoded
    }

    return encoded;
  });

  //instantiate merkletree
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  // console.log('Whitelist Merkle Tree\n',merkleTree.toString())
  //get the root hash
  const rootHash = "0x" + merkleTree.getRoot().toString("hex");
  const hashHexProof = merkleTree.getHexProof(targetNode);
  return { rootHash, hashHexProof, targetAmount };
}

export function generateEachAmount(totalAmount, addresses, type) {
  let envelopeList = [];
  let generatedAmount = 0;
  addresses.forEach((addr, _index) => {
    let randomAmount = 0;
    let randomPoint = 0;

    if (_index === addresses.length - 1) {
      envelopeList.push([addr, totalAmount - generatedAmount]);
    } else {
      if (type === "Equal") {
        envelopeList.push([addr, Math.floor(totalAmount / addresses.length)]);
        generatedAmount += randomAmount;
      } else {
        while (!randomPoint || randomPoint > 0.5) {
          randomPoint = Math.random();
          if (randomPoint > 0.5) continue;
          randomAmount = Math.floor(
            randomPoint * (totalAmount - generatedAmount)
          );
          generatedAmount += randomAmount;
          envelopeList.push([addr, randomAmount]);
        }
      }
    }
  });
  return envelopeList;
}
