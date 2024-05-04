import { http, createConfig } from "@wagmi/core";
import { base, mainnet, sepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  transports: {
    // [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/rtT5Fs5XAU84VfkAJisY5Hfr1Ord0ci4"),
    // [base.id]: http("https://base-mainnet.g.alchemy.com/v2/cmESqI7lQ9VncnHhCJuTwPZrAzO9SUkR"),
    // [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/55vbo0cjro1DAT5M7LUFs5L02lop7kGn"),
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});
