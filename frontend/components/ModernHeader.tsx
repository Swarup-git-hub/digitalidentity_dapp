import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import { LogOut, Wallet, Zap } from "lucide-react";

export function ModernHeader() {
  const { connected, connect, disconnect, account } = useWallet();

  const formatAddress = (address: any) => {
    const addrStr = address?.toString() || "";
    return addrStr.length > 10 ? `${addrStr.slice(0, 6)}...${addrStr.slice(-4)}` : addrStr;
  };

  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg"
    >
      <div className="flex items-center space-x-2">
        <Zap className="w-8 h-8 text-white" />
        <h1 className="text-2xl font-bold text-white">Digital Identity</h1>
      </div>

      {connected ? (
        <motion.button
          onClick={disconnect}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-md"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{formatAddress(account?.address)}</span>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => connect("Petra")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors shadow-md"
        >
          <Wallet className="w-4 h-4" />
          Connect Petra
        </motion.button>
      )}
    </motion.header>
  );
}
