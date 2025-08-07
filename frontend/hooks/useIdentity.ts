import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { identityService } from "../services/identityService";
import toast from "react-hot-toast";

export function useIdentity() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [identity, setIdentity] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    account && load();
  }, [account]);

  const load = async () => {
    if (!account) return;
    setIdentity(await identityService.get(account.address.toString()));
  };

  const save = async (data: { username: string; bio: string }) => {
    if (!account) return toast.error("Connect wallet");
    setBusy(true);
    try {
      if (identity) {
        await identityService.update(data, signAndSubmitTransaction);
      } else {
        await identityService.create(data, signAndSubmitTransaction);
      }
      toast.success("Saved on-chain!");
      await load();
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed");
    }
    setBusy(false);
  };

  return { identity, busy, save };
}
