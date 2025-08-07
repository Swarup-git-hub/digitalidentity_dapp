import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type UpdateIdentityArguments = {
  username?: string;
  bio?: string;
  avatar?: string;
};

export const updateIdentity = (args: UpdateIdentityArguments): InputTransactionData => {
  const { username, bio, avatar } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::IdentityManagement::update_identity`,
      functionArguments: [
        username ? Array.from(new TextEncoder().encode(username)) : [],
        bio ? Array.from(new TextEncoder().encode(bio)) : [],
        avatar ? Array.from(new TextEncoder().encode(avatar)) : [],
      ],
    },
    options: {
      maxGasAmount: 50000, // Increased from 10000
      gasUnitPrice: 100,
    },
  };
};
