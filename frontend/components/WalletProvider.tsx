// import { PropsWithChildren } from "react";
// import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// // Internal components
// import { useToast } from "@/components/ui/use-toast";
// // Internal constants
// import { APTOS_API_KEY, NETWORK } from "@/constants";

// export function WalletProvider({ children }: PropsWithChildren) {
//   const { toast } = useToast();

//   return (
//     <AptosWalletAdapterProvider
//       autoConnect={true}
//       dappConfig={{ network: NETWORK, aptosApiKeys: {[NETWORK]: APTOS_API_KEY} }}
//       onError={(error) => {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: error || "Unknown wallet error",
//         });
//       }}
//     >
//       {children}
//     </AptosWalletAdapterProvider>
//   );
// }

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import { ReactNode } from "react";

export function WalletProvider({ children }: { children: ReactNode }) {
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
