import { useIdentity } from "../hooks/useIdentity";
import { motion } from "framer-motion";

export function IdentityCard() {
  const { identity } = useIdentity();
  if (!identity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 bg-purple-500/60 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">{identity.username[0].toUpperCase()}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{identity.username}</h2>
      <p className="text-black/70">{identity.bio}</p>
    </motion.div>
  );
}
