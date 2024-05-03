
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


const redPacketAddresses=[
    "0x262bCDeEf90181676BDC0a247A1954666F8a2815",
    "0x262bCDeEf90181676BDC0a247A1954666F8a2816",
    "0x262bCDeEf90181676BDC0a247A1954666F8a2817",
]
export function generateMerkleTree(){
    //store leaf node into buffer
    const leafNodes = redPacketAddresses.map(addr => keccak256(addr))
    console.log('leafnodes:\n',leafNodes)

    //instantiate merkletree
    const merkleTree = new MerkleTree(leafNodes,keccak256,{sortPairs:true});
    // console.log('Whitelist Merkle Tree\n',merkleTree.toString())
    console.log(' Merkle Tree\n',merkleTree)
    
    //get the root hash
    const rootHash = merkleTree.getRoot();
    console.log('Root hash\n',rootHash)
    
    return merkleTree;
}

export function generateProof(address,merkleTree){
    //get merkle tree proof
    const hexProof = merkleTree.getHexProof(address)
    console.log(hexProof);

    const hashHexProof=merkleTree.getHexProof(keccak256(address));
    console.log(hashHexProof);
}