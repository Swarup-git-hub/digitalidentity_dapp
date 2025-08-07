import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type CreateIdentityArguments = {
  username: string;
  bio: string;
};

export const createIdentity = (args: CreateIdentityArguments): InputTransactionData => {
  const { username, bio } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::IdentityManagement::create_identity`,
      functionArguments: [Array.from(new TextEncoder().encode(username)), Array.from(new TextEncoder().encode(bio))],
    },
    options: {
      maxGasAmount: 50000, // Increased from 10000
      gasUnitPrice: 100,
    },
  };
};
