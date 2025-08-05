import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";

export function WalletConnection() {
  const { connect } = useWallet();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-black">ID</span>
        </motion.div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Welcome to Digital Identity
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Connect your Petra wallet to create and manage your on-chain identity. Your digital presence, secured by
          blockchain technology.
        </p>

        <motion.button
          onClick={() => connect("Petra")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-black shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          Connect Petra Wallet
        </motion.button>

        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <div className="glass p-4 rounded-xl">
            <div className="text-purple-400 font-semibold">Secure</div>
            <div className="text-gray-400">Blockchain verified</div>
          </div>
          <div className="glass p-4 rounded-xl">
            <div className="text-blue-400 font-semibold">Decentralized</div>
            <div className="text-gray-400">No central authority</div>
          </div>
          <div className="glass p-4 rounded-xl">
            <div className="text-green-400 font-semibold">Permanent</div>
            <div className="text-gray-400">Immutable records</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
