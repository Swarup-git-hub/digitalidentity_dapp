import { useIdentity } from "../hooks/useIdentity";
import { motion } from "framer-motion";
import { Calendar, Award, Shield, User, CheckCircle, Zap } from "lucide-react";

export function ModernIdentityCard() {
  const { identity } = useIdentity();
  if (!identity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 p-1 rounded-2xl">
        <div className="bg-gray-900 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{identity.username[0].toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-gray-900" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{identity.username}</h2>
                <p className="text-sm text-gray-400">@{identity.username.toLowerCase()}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-full text-sm font-medium"
            >
              <span className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </span>
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

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Joined</span>
              </div>
              <p className="text-sm font-semibold text-white">Recently</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-gray-400">Status</span>
              </div>
              <p className="text-sm font-semibold text-green-400">Active</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Identity ID
              </span>
              <code className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-purple-400">
                {identity.id?.slice(0, 8)}...{identity.id?.slice(-6)}
              </code>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
