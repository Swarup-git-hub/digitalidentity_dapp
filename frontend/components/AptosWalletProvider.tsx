import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import { ReactNode } from "react";

export function AptosWalletProvider({ children }: { children: ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        aptosApiKeys: { [Network.TESTNET]: import.meta.env.VITE_APTOS_API_KEY || "" },
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
