// import { WalletSelector } from "./WalletSelector";

// export function Header() {
//   return (
//     <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
//       <h1 className="display">Digital Identity</h1>

//       <div className="flex gap-2 items-center flex-wrap">
//         <WalletSelector />
//       </div>
//     </div>
//   );
// }

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import { LogOut, Wallet } from "lucide-react";

export function Header() {
  const { connected, connect, disconnect, account } = useWallet();

  const formatAddress = (address: any) => {
    const addrStr = address?.toString() || "";
    return addrStr.length > 10 ? `${addrStr.slice(0, 6)}...${addrStr.slice(-4)}` : addrStr;
  };

  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
    >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Digital Identity
      </h1>

      {connected ? (
        <motion.button
          onClick={disconnect}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-black font-medium transition-all shadow-lg hover:shadow-red-500/25"
        >
          <LogOut className="w-4 h-4" />
          <span>{formatAddress(account?.address)}</span>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => connect("Petra")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-emerald-500/25"
        >
          <Wallet className="w-4 h-4" />
          Connect Petra
        </motion.button>
      )}
    </motion.header>
  );
}
