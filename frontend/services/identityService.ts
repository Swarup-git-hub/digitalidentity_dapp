import { AptosClient } from "aptos";
import { MODULE_ADDRESS } from "@/constants";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

export interface IdentityData {
  username: string;
  bio: string;
  documents: string[];
  updated_at: string;
}

// Fallback to local storage for development/testing
const useLocalStorage = true;

export const identityService = {
  async create(
    data: { username: string; bio: string; documents?: string[] },
    signAndSubmitTransaction?: (transaction: any) => Promise<any>,
  ): Promise<void> {
    if (useLocalStorage) {
      // Store in localStorage for development
      const identity: IdentityData = {
        username: data.username,
        bio: data.bio,
        documents: data.documents || [],
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem("digital_identity", JSON.stringify(identity));
      return Promise.resolve();
    }

    try {
      const { createIdentity } = await import("../entry-functions/createIdentity");
      const transaction = createIdentity({ username: data.username, bio: data.bio });
      return signAndSubmitTransaction
        ? signAndSubmitTransaction(transaction)
        : Promise.reject("No signAndSubmitTransaction function provided");
    } catch (error) {
      console.error("Blockchain creation failed, using local storage:", error);
      return this.create(data);
    }
  },

  async update(
    data: { username: string; bio: string; documents?: string[] },
    signAndSubmitTransaction?: (transaction: any) => Promise<any>,
  ): Promise<void> {
    if (useLocalStorage) {
      const existing = localStorage.getItem("digital_identity");
      const identity: IdentityData = {
        ...JSON.parse(existing || "{}"),
        username: data.username,
        bio: data.bio,
        documents: data.documents || [],
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem("digital_identity", JSON.stringify(identity));
      return Promise.resolve();
    }

    try {
      const { updateIdentity } = await import("../entry-functions/updateIdentity");
      const transaction = updateIdentity({ username: data.username, bio: data.bio });
      return signAndSubmitTransaction
        ? signAndSubmitTransaction(transaction)
        : Promise.reject("No signAndSubmitTransaction function provided");
    } catch (error) {
      console.error("Blockchain update failed, using local storage:", error);
      return this.update(data);
    }
  },

  async get(address?: string): Promise<IdentityData | null> {
    if (useLocalStorage) {
      const stored = localStorage.getItem("digital_identity");
      return stored ? JSON.parse(stored) : null;
    }

    try {
      const resource = await client.getAccountResource(
        address || "",
        `${MODULE_ADDRESS}::IdentityManagement::Identity`,
      );

      if (resource && resource.data) {
        const data = resource.data as any;
        return {
          username: data.username || "",
          bio: data.bio || "",
          documents: [],
          updated_at: data.updated_at || new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error("Blockchain get failed, using local storage:", error);
      return this.get();
    }
  },
};
