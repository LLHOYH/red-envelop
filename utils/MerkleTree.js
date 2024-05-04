import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export function generateMerkleTree(envelopeList) {
  //store leaf node into buffer
  console.log(envelopeList)
  const leafNodes = envelopeList.map((env) => keccak256(JSON.stringify(env)));
  console.log("leafnodes:\n", leafNodes);

  //instantiate merkletree
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  // console.log('Whitelist Merkle Tree\n',merkleTree.toString())
  console.log(" Merkle Tree\n", merkleTree);

  //get the root hash
  const rootHash = merkleTree.getRoot();
  console.log("Root hash\n", rootHash);

  return merkleTree;
}

export function generateProof(address, merkleTree) {
  //get merkle tree proof
  const hexProof = merkleTree.getHexProof(address);
  console.log(hexProof);

  const hashHexProof = merkleTree.getHexProof(keccak256(address));
  console.log(hashHexProof);
}

export function generateEachAmount(totalAmount, addresses) {
  let envelopeList = [];
  let generatedAmount = 0;
  addresses.forEach((addr, _index) => {
    let randomAmount = 0;
    let randomPoint = 0;
    if (_index === addresses.length - 1) {
      envelopeList.push({
        address: addr,
        amount: totalAmount - generatedAmount,
      });
    } else {
      while (!randomPoint || randomPoint > 0.5) {
        randomPoint = Math.random();
        if (randomPoint > 0.5) continue;
        randomAmount = randomPoint * (totalAmount - generatedAmount);
        generatedAmount += randomAmount;
        envelopeList.push({ address: addr, amount: randomAmount });
      }
    }
  });
  return envelopeList
}
