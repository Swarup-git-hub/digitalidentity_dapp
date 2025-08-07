import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, LogOut, RefreshCw, Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";

export function PetraWalletConnection() {
  const { connect, disconnect, account, connected, wallet, network } = useWallet();

  const [aptBalance, setAptBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (connected && account) {
      fetchBalance();
    }
  }, [connected, account]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${account?.address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`,
      );
      const data = await response.json();
      const balance = parseInt(data.data.coin.value) / 100000000;
      setAptBalance(balance.toFixed(4));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleConnect = async (walletName: string) => {
    setIsConnecting(true);
    try {
      await connect(walletName);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletName}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Successfully disconnected wallet",
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openInExplorer = () => {
    if (account?.address) {
      window.open(`https://explorer.aptoslabs.com/account/${account.address}?network=testnet`, "_blank");
    }
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] p-8"
      >
        <div className="text-center mb-8">
          <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Petra Wallet</h2>
          <p className="text-gray-600">Start your digital identity journey on Aptos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          <Button
            onClick={() => handleConnect("Petra")}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : "Connect Petra"}
          </Button>

          <Button
            onClick={() => handleConnect("Martian")}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : "Connect Martian"}
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Don't have a wallet?{" "}
            <a href="https://petra.app" className="text-blue-500 hover:underline">
              Install Petra
            </a>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Connected Wallet</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {network?.name || "Testnet"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Address</p>
            <div className="flex items-center space-x-2">
              <p className="font-mono text-sm truncate flex-1">
                {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
              </p>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="p-1 h-6 w-6">
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={openInExplorer} className="p-1 h-6 w-6">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">APT Balance</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">{aptBalance}</p>
              <span className="text-sm text-gray-500">APT</span>
              <Button variant="ghost" size="sm" onClick={fetchBalance} className="p-1 h-6 w-6">
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Wallet</p>
            <p className="font-medium">{wallet?.name || "Unknown"}</p>
          </div>

          <Button
            onClick={handleDisconnect}
            variant="outline"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect Wallet
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
