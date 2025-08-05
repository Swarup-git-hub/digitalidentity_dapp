import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { EnhancedIdentityForm } from "./components/EnhancedIdentityForm";
import { EnhancedIdentityCard } from "./components/EnhancedIdentityCard";
import { WalletConnection } from "./components/WalletConnection";
import { BackgroundAnimation } from "./components/BackgroundAnimation";

export default function App() {
  const { connected } = useWallet();

  return (
    <>
      <BackgroundAnimation />
      <Header />

      <main className="min-h-screen relative z-10">
        {!connected ? (
          <WalletConnection />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 py-12"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Your Digital Identity
              </h1>
              <p className="text-xl text-black max-w-2xl mx-auto">
                Create and manage your on-chain identity with style and security
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <EnhancedIdentityForm />
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <EnhancedIdentityCard />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
