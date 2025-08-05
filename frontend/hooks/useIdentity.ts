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
    setIdentity(await identityService.get(account.address));
  };

  const save = async (data: { username: string; bio: string }) => {
    if (!account) return toast.error("Connect wallet");
    setBusy(true);
    try {
      await identityService[identity ? "update" : "create"](data, signAndSubmitTransaction);
      toast.success("Saved on-chain!");
      await load();
    } catch {
      toast.error("Transaction failed");
    }
    setBusy(false);
  };

  return { identity, busy, save };
}
