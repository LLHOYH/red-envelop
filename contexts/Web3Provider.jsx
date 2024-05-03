"use client";

import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  const config = getDefaultConfig({
    appName: "RedPacket",
    projectId: "5a003a01c2453d55c2475817334d9993",
    chains: [sepolia, mainnet, polygon, base ],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
