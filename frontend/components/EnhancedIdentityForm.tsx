import { useState } from "react";
import { useIdentity } from "../hooks/useIdentity";
import { motion } from "framer-motion";

export function EnhancedIdentityForm() {
  const { identity, busy, save } = useIdentity();
  const [form, setForm] = useState({
    username: identity?.username ?? "",
    bio: identity?.bio ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save(form);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-8 rounded-2xl border border-white/10 space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {identity ? "Update Your Identity" : "Create Your Identity"}
        </h3>
        <p className="text-gray-400 mt-2">
          {identity ? "Update your digital presence" : "Start building your on-chain reputation"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={form.username}
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full glass p-4 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all"
            placeholder="Enter your username"
            maxLength={30}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full glass p-4 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all resize-none"
            placeholder="Tell us about yourself..."
            rows={4}
            maxLength={200}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-purple-500/25"
      >
        {busy ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing...
          </div>
        ) : identity ? (
          "Update Identity"
        ) : (
          "Create Identity"
        )}
      </motion.button>
    </motion.form>
  );
}
