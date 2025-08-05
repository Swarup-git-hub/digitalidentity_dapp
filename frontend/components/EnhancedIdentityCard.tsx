import { useIdentity } from "../hooks/useIdentity";
import { motion } from "framer-motion";
import { Calendar, Award } from "lucide-react";

export function EnhancedIdentityCard() {
  const { identity } = useIdentity();
  if (!identity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl" />

      <div className="relative glass p-8 rounded-2xl border border-white/10">
        <div className="flex items-start justify-between mb-6">
          <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">{identity.username[0].toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>

            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {identity.username}
              </h2>
              <p className="text-sm text-gray-400">@{identity.username.toLowerCase()}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
          >
            <span className="text-xs font-medium text-purple-300">Verified</span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 mb-6 leading-relaxed"
        >
          {identity.bio || "No bio provided yet"}
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-4 rounded-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Joined</span>
            </div>
            <p className="text-sm font-medium">Recently</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-4 rounded-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Status</span>
            </div>
            <p className="text-sm font-medium text-green-400">Active</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 glass rounded-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Identity ID</span>
            <code className="text-xs font-mono bg-gray-800 px-2 py-1 rounded">
              {identity.id?.slice(0, 8)}...{identity.id?.slice(-6)}
            </code>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
