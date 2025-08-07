import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Digital Identity Platform",
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || "your-project-id",
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http("https://rpc-mumbai.maticvigil.com"),
  },
});

const queryClient = new QueryClient();

export function EthereumWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
