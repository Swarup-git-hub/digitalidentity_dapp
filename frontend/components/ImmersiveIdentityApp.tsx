import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { EnhancedIdentityForm } from "./EnhancedIdentityForm";
import { EnhancedIdentityCard } from "./EnhancedIdentityCard";
import { BackgroundAnimation } from "./BackgroundAnimation";
import { WalletConnection } from "./WalletConnection";
import { useIdentity } from "../hooks/useIdentity";
import { toast, Toaster } from "react-hot-toast";
import { Sparkles, User, Settings, Home } from "lucide-react";

export function ImmersiveIdentityApp() {
  const { account } = useWallet();
  const { identity, busy, save } = useIdentity();
  const [activeTab, setActiveTab] = useState<"home" | "create" | "profile">("home");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (identity) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [identity]);

  const handleSave = async (data: { username: string; bio: string; documents?: string[] }) => {
    try {
      await save(data);
      toast.success("Identity saved successfully! 🎉");
      setActiveTab("profile");
    } catch (error) {
      toast.error("Failed to save identity");
    }
  };

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "create", label: "Create Identity", icon: User },
    { id: "profile", label: "My Profile", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <BackgroundAnimation />
      <Toaster position="top-center" />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  x: Math.random() * window.innerWidth,
                  opacity: 0,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 glass border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Identity Hub
              </h1>
            </motion.div>
            <WalletConnection />
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative z-10 glass border-t border-white/10 mt-4"
      >
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              >
                Welcome to Your Digital Identity
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Create, manage, and showcase your on-chain identity with cutting-edge design and seamless functionality.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { title: "Create Identity", desc: "Build your unique digital presence", icon: User },
                  { title: "Upload Documents", desc: "Securely store your credentials", icon: Settings },
                  { title: "Manage Profile", desc: "Update and maintain your identity", icon: Sparkles },
