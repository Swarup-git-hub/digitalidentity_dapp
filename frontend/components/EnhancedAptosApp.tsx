import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { EnhancedIdentityForm } from "./EnhancedIdentityForm";
import { EnhancedIdentityCard } from "./EnhancedIdentityCard";
import { PetraWalletConnection } from "./PetraWalletConnection";
import { BackgroundAnimation } from "./BackgroundAnimation";
import { AptosIdentityDashboard } from "./AptosIdentityDashboard";

export function EnhancedAptosApp() {
  const { connected } = useWallet();

  return (
    <>
      <BackgroundAnimation />
      <Header />

      <main className="min-h-screen relative z-10">
        {!connected ? (
          <PetraWalletConnection />
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Your Digital Identity on Aptos
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create and manage your on-chain identity with Petra wallet integration
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <AptosIdentityDashboard />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
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
