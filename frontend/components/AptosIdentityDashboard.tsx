import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Shield, Award, Share2, QrCode, Copy } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";

interface IdentityData {
  username: string;
  bio: string;
  reputation: number;
  credentials: Credential[];
  createdAt: string;
}

interface Credential {
  id: string;
  type: string;
  issuer: string;
  verified: boolean;
}

export function AptosIdentityDashboard() {
  const { account, connected } = useWallet();
  const [identity, setIdentity] = useState<IdentityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (connected && account) {
      fetchIdentity();
    }
  }, [connected, account]);

  const fetchIdentity = async () => {
    setLoading(true);
    try {
      // Fetch identity from Move contract
      const response = await fetch(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${account?.address}/resource/${import.meta.env.VITE_CONTRACT_ADDRESS}::IdentityManagement::Identity`,
      );

      if (response.ok) {
        const data = await response.json();
        setIdentity({
          username: data.data.username || "",
          bio: data.data.bio || "",
          reputation: 0,
          credentials: [],
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error fetching identity:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = () => {
    if (account?.address) {
      const qrData = {
        did: `did:aptos:${account.address}`,
        network: "testnet",
        timestamp: new Date().toISOString(),
      };
      setQrCode(JSON.stringify(qrData, null, 2));
    }
  };

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address.toString());
      toast({
        title: "Address Copied",
        description: "Aptos address copied to clipboard",
      });
    }
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] p-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Connect your Petra wallet to view your identity</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Card */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Digital Identity</h3>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {identity ? "Active" : "Not Created"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Aptos Address</label>
              <div className="flex items-center space-x-2 mt-1">
                <p className="font-mono text-sm truncate flex-1">
                  {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}
                </p>
                <Button variant="ghost" size="sm" onClick={copyAddress} className="p-1 h-6 w-6">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {identity && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <p className="text-lg font-semibold">{identity.username}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-600">{identity.bio}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Reputation</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${identity.reputation}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{identity.reputation}%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Actions Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={generateQRCode}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>

            <Button onClick={fetchIdentity} disabled={loading} className="w-full">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh Identity
            </Button>

            <Button
              onClick={() =>
                window.open(`https://explorer.aptoslabs.com/account/${account?.address}?network=testnet`, "_blank")
              }
              variant="outline"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </Card>
      </div>

      {/* Credentials Section */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-4">Credentials</h3>
        <div className="space-y-3">
          {identity?.credentials.map((credential) => (
            <div key={credential.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">{credential.type}</p>
                  <p className="text-sm text-gray-600">Issuer: {credential.issuer}</p>
                </div>
              </div>
              <Badge variant={credential.verified ? "default" : "secondary"}>
                {credential.verified ? "Verified" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* QR Code Display */}
      {qrCode && (
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">Identity QR Code</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">{qrCode}</pre>
        </Card>
      )}
    </motion.div>
  );
}
