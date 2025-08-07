import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useIdentity } from "../hooks/useIdentity";
import { User, Calendar, Award, Share2, ExternalLink } from "lucide-react";

export function ProfileView() {
  const { address } = useParams();
  const { account } = useWallet();
  const { identity } = useIdentity();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      // In a real app, this would fetch from blockchain
      setProfile(identity);
      setIsLoading(false);
    }
  }, [address, identity]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Profile Not Found</h2>
          <p className="text-gray-400">This identity doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {profile.username}'s Profile
        </h1>
        <p className="text-xl text-gray-300 mb-4">Digital Identity on the Aptos Blockchain</p>
      </div>

      <div className="glass p-8 rounded-2xl border border-white/10 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-black">{profile.username[0].toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.username}</h2>
              <p className="text-sm text-gray-400">@{profile.username.toLowerCase()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium">
              <Share2 className="w-4 h-4 inline-block mr-2" />
              Share
            </button>
            <button className="px-4 py-2 bg-gray-700 rounded-lg text-white font-medium">
              <ExternalLink className="w-4 h-4 inline-block mr-2" />
              View on Explorer
            </button>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 mb-6 leading-relaxed"
        >
          {profile.bio || "No bio provided yet"}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Identity Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Joined: {new Date(profile.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Status: Verified</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Documents</h3>
            <div className="space-y-3">
              {profile.documents?.map((doc: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 mb-6 leading-relaxed"
      >
        {profile.bio || "No bio provided yet"}
      </motion.div>
    </motion.div>
  );
}
