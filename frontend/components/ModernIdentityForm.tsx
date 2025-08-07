import { useState } from "react";
import { useIdentity } from "../hooks/useIdentity";
import { motion } from "framer-motion";
import { Paperclip, User, FileText, CheckCircle } from "lucide-react";
import FileUpload from "./FileUpload";

export function ModernIdentityForm() {
  const { identity, busy, save } = useIdentity();
  const [form, setForm] = useState<{
    username: string;
    bio: string;
    documents: string[];
  }>({
    username: identity?.username ?? "",
    bio: identity?.bio ?? "",
    documents: identity?.documents ?? [],
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process uploaded files
    const fileNames = uploadedFiles.map((file) => file.name);
    const allDocuments = [...form.documents, ...fileNames];

    save({ ...form, documents: allDocuments });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 p-8 rounded-2xl shadow-lg space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">{identity ? "Update Your Identity" : "Create Your Identity"}</h3>
        <p className="text-pink-200 mt-2">
          {identity ? "Update your digital presence" : "Start building your on-chain reputation"}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-white" />
            Username
          </label>
          <input
            type="text"
            value={form.username}
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all border border-pink-300 bg-pink-900 text-white placeholder-pink-300"
            placeholder="Enter your username"
            maxLength={30}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-white" />
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all border border-pink-300 bg-pink-900 text-white placeholder-pink-300 resize-none"
            placeholder="Tell us about yourself..."
            rows={4}
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center">
            <Paperclip className="w-4 h-4 mr-2 text-white" />
            Documents & Files
          </label>
          <FileUpload
            onFilesChange={setUploadedFiles}
            maxFiles={3}
            maxSize={5}
            acceptedTypes={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif"]}
            existingFiles={form.documents}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-green-400 hover:bg-green-500 text-gray-900 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {busy ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
            Processing...
          </div>
        ) : identity ? (
          <div className="flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-2 text-gray-900" />
            Update Identity
          </div>
        ) : (
          "Create Identity"
        )}
      </motion.button>
    </motion.form>
  );
}
